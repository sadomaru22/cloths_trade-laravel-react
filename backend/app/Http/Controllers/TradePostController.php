<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTradePostRequest;
use App\Http\Requests\UpdateTradePostRequest;
use App\Models\TradePost;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        //Log::debug($user);  //テスト用
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
        $tradeposts = TradePost::create($request->all());   //responseでtradepostを返しても、画面で使うわけではないから適当でいい
        return response()->json(
            $tradeposts,
            201
        );
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
