<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTradePostRequest;
use App\Http\Requests\UpdateTradePostRequest;
use App\Models\TradePost;
use App\Models\User;
use Illuminate\Http\Request;

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
    public function index(User $user)
    {
        // Viewの代わりにJSONとして返却
        return TradePost::where('user_id', $user->id)
            ->orderBy('date', 'desc')   //日付降順
            ->paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTradePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTradePostRequest $request)
    {
        $tradeposts = TradePost::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Insert Success!',
            'details' => $tradeposts
        ]);
    }

    //一件表示
    public function show(string $user, TradePost $tradePost, Request $request)
    {
        $id = $request->id;
        // 存在しないレコードIDだったら
        if (TradePost::where('id', $id)->exists() == false) {
            return response()->json([
                'success' => false,
                'message' => 'Show failed...',
                'details' => 'Invalid ID'
            ]);
        }
        // 問題なければjsonで結果を返す
        return response()->json([
            'success' => true,
            'message' => 'Insert Success!',
            'details' => TradePost::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTradePostRequest  $request
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTradePostRequest $request, TradePost $tradePost)
    {
        $id = $request->id;
        $result = TradePost::find($id);
        $result->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Success!',
            'details' => $request->all()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, TradePost $tradePost)
    {
        $id = $request->id;
        if (TradePost::where('id', $id)->exists()) {
            $result = TradePost::find($id);
            $result->delete();

            return response()->json([
                'success' => true,
                'message' => 'Delete Success!',
                'details' => $result
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed...',
                'details' => 'Invalid ID'
            ]);
        }
    }
}
