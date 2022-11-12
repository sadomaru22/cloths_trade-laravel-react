<?php

namespace App\Http\Controllers;

use App\Models\SankaFlag;
use App\Models\TradePost;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Providers\RouteServiceProvider;


class TradePost2Controller extends Controller
{

    //過去のトレード一覧
    public function past(Request $request)
    {
        return TradePost::where([
            ['user_id', '=', $request->id],
            ['date', '<', now()],
        ])
            ->paginate(20);
    }

    //参加予定のトレード一覧
    public function pending($id)
    {
        $pflag = SankaFlag::where([
            ['user_id', '=', $id],
            ['pending_flag', '=', true],
        ]);
        $result = TradePost::where([
            ['tradepost_id', '=', $pflag->tradepost_id],
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

    //参加確定したトレード一覧
    public function confirmed($id)
    {
        $cflag = SankaFlag::where([
            ['user_id', '=', $id],
            ['confirmed_flag', '=', true],
        ]);
        $result = TradePost::where([
            ['tradepost_id', '=', $cflag->tradepost_id],
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

    //キーワード検索
    public function search(Request $request)
    {
        // キーワードで検索
        $result = TradePost::where('title', 'like', "%$request->keyword%")
            ->orwhere('content', 'like', "%$request->keyword%")->get();

        // 問題なければjsonで結果を返す
        return response()->json(
            $result,
            200
        );
    }

    public function searchBySb(Request $request, $place)
    {
        Log::debug($place);
        // 渡ってきた都道府県名と一致するものを探す
        $result = TradePost::where('place', 'like', "%$place%")
            ->orderBy('date', 'desc')   //日付降順
            ->paginate(20);

        //Log::debug("messagefrom searchBySb" . $request);
        // 該当のトレードがあればjsonで結果を返す  //とりあえずこの実装でresponseは返せる
        Log::debug($result);
        return $result
            ? response()->json($result, 200)  //urlとsuccess返すん一旦やめで。
            : response()->json(['message' => '該当のトレードはありませんでした。']);

        // $path = $request->session()->get('url.intended');
        // $url = $path
        //     ? url($path . '/searchResult')
        //     : url(env('SPA_URL') . '/login');

        //return redirect(RouteServiceProvider::HOME);;

        //response()->header('Access-Control-Allow-Origin', '*');
        //return redirect(env('SPA_URL') . "/searchResult");
    }
}
