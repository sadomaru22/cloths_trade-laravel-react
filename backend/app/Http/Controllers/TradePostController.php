<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTradePostRequest;
use App\Http\Requests\UpdateTradePostRequest;
use App\Models\TradePost;
use App\Models\User;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image as InterventionImage;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Exception;
use App\Http\Resources\TradePostCollection;

class TradePostController extends Controller
{
    // public function __construct(Request $request)
    // {
    //     $userId = $request->route('user');

    //     // `Controller`の各メソッドに`User $user` or `string $user`が必要
    //     // パラメータ `{user}` を取得し、`middleware`に渡すため`
    //     $this->middleware("authorize:${userId}");
    // }
    /**
     * ユーザーに紐づく値全件表示
     * @param string $user パラメータの値 (ユーザーID)
     */
    public function index($user)
    {
        // Viewの代わりにJSONとして返却
        return new TradePostCollection(
            TradePost::where([
                ['user_id', '=', $user],
                ['date', '>', now()],
            ])->orderBy('date', 'desc')->paginate(12)
        );
    }

    //新規投稿
    public function store(StoreTradePostRequest $request)
    {
        $id = Auth::id();
        Log::debug($id . "=ユーザID");
        Log::debug($request->all());
        $thumbnail = $request->file('photos_0')->getClientOriginalName();  //1枚目の画像
        Log::debug($thumbnail);
        //投稿の保存
        $tradePost = new TradePost();
        $tradePost->user_id = $id;
        $tradePost->title = $request->get('title');
        $tradePost->maxCapa = $request->get('maxCapa');
        $tradePost->place = $request->get('place');
        $tradePost->description = $request->get('description');
        $tradePost->date = $request->get('date');
        $tradePost->thumbnail = 'http://localhost/storage/' . $thumbnail;
        $tradePost->save();

        //残りの画像の保存
        //73行目で既にTradePostTへの保存が完了しているため、一番若いidがここで入れるtrade_post_idに該当するため、この取り方でいい。
        //$trade_post_id = DB::select('select max(id) as id from trade_posts');
        $trade_post_id = TradePost::max('id'); //こっちはどう？
        try {
            for ($i = 0; $i < 10; $i++) {
                //Laravelのstorage/app/publicに全画像を保存
                $index = $request->file('photos_' . $i);
                if ($index) {
                    $file_name = $index->getClientOriginalName();
                    //$index->storeAs('public', $file_name);  //まずはstorage/app/publicに画像を保存
                    InterventionImage::make($index)->resize(510, 809, function ($constraint) {
                        // 縦横比を保持したままにする
                        $constraint->aspectRatio();
                        // 小さい画像は大きくしない
                        $constraint->upsize();
                    })->save(storage_path('/app/public/' . $file_name));;
                    //画像のパスをImagesTに保存
                    $images = new Image();   //ここでnewしないと最初の1件しかsave()されない
                    $images->trade_post_id = $trade_post_id;
                    Log::debug('89行目');
                    $images->file_name = 'http://localhost/storage/' . $file_name;
                    $images->save();
                };
            };
        } catch (\Exception $e) { //3枚の画像のリクエストが来た場合、4枚目以降はreturnに走るようにする。
        };
        return response()->json(['success' => true, 'url' => "/users/$id/top"], 201);
    }

    //一件表示  //投稿に結びつく画像を取ってくるメソッドにする
    public function show(Request $request)
    {
        $id = $request->trade_post;
        Log::debug($id);
        // 存在するレコードIDだったら
        if (TradePost::where('id', $id)->exists()) {
            //$dataOne = TradePost::find($id);
            $dataOne = TradePost::with('sankaflag')->where('id', $id)->first();  //SankaFlagも取ってくる
            $photos = Image::where('trade_post_id', $id)->get();
            Log::debug($photos);
            return response()->json(['dataOne' => $dataOne, 'photos' => $photos], 200);
            //return Image::where('trade_post_id', $id)->pluck('file_name');
        } else {
            return response()->json([
                'message' => 'Show failed...',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTradePostRequest  $request
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTradePostRequest $request)
    {
        $id = $request->id;
        $result = TradePost::find($id);
        $result->update($request->all());
        $results = $request->all();

        if ($result) {
            return response()->json(
                $results,
                200
            );
        } else {
            response()->json([
                'message' => 'Post was not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)  //
    {
        $id = $request->id;
        if (TradePost::where('id', $id)->exists()) {
            $result = TradePost::find($id);
            $result->delete();

            return response()->json([
                'message' => 'Delete Success!',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Delete failed...',
            ], 404);
        }
    }
}
