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
        //Log::debug($user);  //テスト用
        // Viewの代わりにJSONとして返却
        return TradePost::where('user_id', $user)
            ->orderBy('date', 'desc')   //日付降順
            ->paginate(20);
    }

    //新規投稿
    public function store(StoreTradePostRequest $request)
    {
        //$tradeposts = TradePost::create($request->all());   //responseでtradepostを返しても、画面で使うわけではないから適当でいい
        // return response()->json(
        //     $tradeposts,
        //     201
        // );
        $id = Auth::id();
        Log::debug($id . "=ユーザID");
        Log::debug($request->all());

        //$files = $request->file('photos');
        $thumbnail = $request->file('photos_0')->getClientOriginalName();
        Log::debug($thumbnail);
        // TradePost::create(
        //     [
        //         `user_id` => $id,
        //         `title` => $request->get('title'),
        //         `maxCapa` => $request->get('maxCapa'),
        //         `place` => $request->get('place'),
        //         `description` => $request->get('description'),
        //         `date` => $request->get('date'),
        //         `thumbnail` => $thumbnail,
        //     ]
        // );
        $tradePost = new TradePost();
        $tradePost->user_id = $id;
        $tradePost->title = $request->get('title');
        $tradePost->maxCapa = $request->get('maxCapa');
        $tradePost->place = $request->get('place');
        $tradePost->description = $request->get('description');
        $tradePost->date = $request->get('date');
        $tradePost->thumbnail = $thumbnail;
        $tradePost->save();

        return response()->json(['success' => true, 'url' => "/users/$id/top", 'message' => 'トレードの投稿が完了しました!'], 201);
    }

    //一件表示
    public function show(Request $request)
    {
        $id = $request->id;
        // 存在するレコードIDだったら
        if (TradePost::where('id', $id)->exists()) {
            $result = TradePost::find($id);
            return response()->json(
                $result,
                200
            );
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
