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

class SinseiController extends Controller
{
    //参加申請
    public function sanka(Request $request)
    {
        $sankaFlag = new SankaFlag();
        $sankaFlag->trade_post_id = $request->trade_post_id;
        $sankaFlag->user_id = $request->id;
        $sankaFlag->pending_flag = 1;
        $sankaFlag->save();
        if ($sankaFlag) {
            return response()->json(['success' => true, 'url' => "/pending-ichiran"], 201);
        } else {
            return 405;
        }
    }

    //参加申請の受理
    public function juri(Request $request)
    {
        $id = $request->trade_post_id;
        //SankaFlagTにて、指定ユーザのflagを変更して保存
        $user = SankaFlag::where([
            ['user_id', '=', $request->user_id],
            ['trade_post_id', '=', $id]
        ])->first();
        $user->pending_flag = 0;
        $user->confirmed_flag = 1;
        $user->save();

        //該当のトレードの参加者を＋1
        TradePost::find($id)->increment('sankasya');

        //投稿に紐づくPendingUsersの最新情報を取得
        $pflag = SankaFlag::where([
            ['trade_post_id', '=', $id],
            ['pending_flag', '=', 1],
        ])->pluck('user_id');
        $users = User::whereIn('id', $pflag)->get();
        return response()->json(['users' => $users]);
    }

    //参加申請の却下
    public function delsyu(Request $request)
    {
        //該当のユーザをSankaFlagから削除
        $id = $request->trade_post_id;
        SankaFlag::where([
            ['user_id', '=', $request->user_id],
            ['trade_post_id', '=', $id]
        ])->delete();

        //投稿に紐づくPendingUsersの最新情報を取得
        $pflag = SankaFlag::where([
            ['trade_post_id', '=', $id],
            ['pending_flag', '=', 1],
        ])->pluck('user_id');
        $users = User::whereIn('id', $pflag)->get();
        return response()->json(['users' => $users]);
    }

    //参加申請取消(PendingDetailから)
    public function delsan(Request $request)
    {
        SankaFlag::where([
            ['user_id', '=', $request->user_id],
            ['trade_post_id', '=', $request->trade_post_id]
        ])->delete();
        return response()->json(['success' => true]);
    }
}
