<?php

namespace App\Http\Controllers;

use App\Http\Resources\TradePostCollection;
use App\Models\SankaFlag;
use App\Models\TradePost;
use App\Models\User;
use App\Models\Image;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image as InterventionImage;


class TradePost2Controller extends Controller
{

    //過去のトレード一覧
    public function past($id)
    {
        return new TradePostCollection(
            TradePost::where([
                ['user_id', '=', $id],
                ['date', '<', now()],
            ])->orderBy('date', 'desc')->paginate(12)
        );
    }

    //参加予定のトレード一覧
    public function pending($id)
    {
        $pflag = SankaFlag::where([
            ['user_id', '=', $id],
            ['pending_flag', '=', 1],
        ])->pluck('trade_post_id');
        return new TradePostCollection(
            TradePost::whereIn('id', $pflag)->orderBy('date', 'desc')->paginate(12)
        );
    }

    //参加確定したトレード一覧
    public function confirmed($id)
    {
        $cflag = SankaFlag::where([
            ['user_id', '=', $id],
            ['confirmed_flag', '=', 1],
        ])->pluck('trade_post_id');
        Log::debug($cflag . '=cflag');
        return new TradePostCollection(
            TradePost::whereIn('id', $cflag)->orderBy('date', 'desc')->paginate(12)
        );
    }

    //トレードの参加者一覧
    //⑨SankaFlag(where request->id=tradepost_id)、user_id全取得、return User(where id = さっき取得したuser_id)
    public function sankasya($id)
    {
        $sflag = SankaFlag::where([
            ['tradepost_id', '=', $id],
        ]);
        $result = User::where([
            ['id', '=', $sflag->user_id],
        ]);
        if ($result) {
            return response()->json(
                $result,
                200
            );
        } else {
            response()->json([
                'message' => 'Post was not found',
            ], 404);
        }
    }

    // //キーワード検索(未実装)
    // public function search(Request $request)
    // {
    //     // キーワードで検索
    //     $result = TradePost::where('title', 'like', "%$request->keyword%")
    //         ->orwhere('content', 'like', "%$request->keyword%")->get();

    //     // 問題なければjsonで結果を返す
    //     return response()->json(
    //         $result,
    //         200
    //     );
    // }

    //セレクトボックスによる検索
    public function searchBySb($place)
    {
        return new TradePostCollection(TradePost::where([
            ['place', 'like', "%$place%"],
            ['date', '>', now()],
        ])->orderBy('date', 'desc')   //日付降順
            ->paginate(12));
    }

    //トレード内容の変更(画像以外)
    public function updateOthers(Request $request)
    {
        $post = TradePost::find($request->trade_post_id);
        $post->title = $request->title;
        $post->date = $request->date;
        $post->maxCapa = $request->maxCapa;
        $post->place = $request->place;
        $post->description = $request->description;

        $post->save();
        return response()->json(['dataOne' => $post]);
    }
    //トレード内容の変更(画像)
    public function updatePhotos(Request $request)
    {
        Log::debug($request->all());
        $trade_post_id = $request->id;
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
        $photos = Image::where('trade_post_id', $trade_post_id)->get();

        return response()->json(['photos' => $photos]);
    }
    //画像の削除(DBから)
    public function deletePhotos(Request $request)
    {
        Log::debug($request->all());
        Image::destroy($request->id);

        $photos = Image::where('trade_post_id', $request->trade_post_id)->get();

        return response()->json(['photos' => $photos]);
    }

    //MyIchiranにて使用。トレードごとにSanka _Flag .pending _flagがついてるかどうかを判定する。
    public function indexWithIsPending($user)
    {
        return new TradePostCollection(
            //TradePost::with('sankaflag:id,pending_flag')->where([
            TradePost::with('sankaflag')->where([
                ['user_id', '=', $user],
                ['date', '>', now()],
            ])->orderBy('date', 'desc')->paginate(12)
        );
    }

    public function showPendingUsers($id)
    {
        $pflag = SankaFlag::where([
            ['trade_post_id', '=', $id],
            ['pending_flag', '=', 1],
        ])->pluck('user_id');
        Log::debug($pflag);
        $users = User::whereIn('id', $pflag)->get();
        return  response()->json(['users' => $users]);
    }
    public function showConfirmedUsers($id)
    {
        $cflag = SankaFlag::where([
            ['trade_post_id', '=', $id],
            ['confirmed_flag', '=', 1],
        ])->pluck('user_id');
        Log::debug($cflag);
        $users = User::whereIn('id', $cflag)->get();
        return  response()->json(['users' => $users]);
    }
}
