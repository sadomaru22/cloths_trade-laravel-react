<?php

namespace App\Http\Controllers;

use App\Http\Resources\TradePostCollection;
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
    public function past($id)
    {
        Log::debug($id . "過去");
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

    public function searchBySb($place)
    {
        Log::debug($place);
        return new TradePostCollection(TradePost::where([
            ['place', 'like', "%$place%"],
            ['date', '>', now()],
        ])->orderBy('date', 'desc')   //日付降順
            ->paginate(12));
    }
}
