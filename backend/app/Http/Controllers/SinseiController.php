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

    public function delsan(Request $request)   //delete
    {
        return;
    }

    public function juri(Request $request)    //update
    {
        return;
    }

    public function delsyu(Request $request)    //delete
    {
        return;
    }
}
