<?php

namespace App\Http\Controllers;

use App\Models\TradePost;
use App\Models\User;
use Illuminate\Http\Request;

class TradePost2Controller extends Controller
{

    public function past(User $user)
    {
        return TradePost::where([
            ['user_id', '=', $user->id],
            ['date', '<', now()],
        ])
            ->paginate(20);
    }

    public function pending()
    {
        return;
    }

    public function confirmed()
    {
        return;
    }

    public function search(Request $request)
    {
        // キーワードで検索
        $result = TradePost::where('title', 'like', "%$request->keyword%")
            ->orwhere('content', 'like', "%$request->keyword%")->get();

        // 問題なければjsonで結果を返す
        return response()->json([
            'success' => true,
            'message' => 'Search Success!',
            'details' => $result
        ]);
    }
}
