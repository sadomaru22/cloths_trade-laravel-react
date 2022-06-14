<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTradePostRequest;
use App\Http\Requests\UpdateTradePostRequest;
use App\Models\TradePost;

class TradePostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTradePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTradePostRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function show(TradePost $tradePost)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Http\Response
     */
    public function destroy(TradePost $tradePost)
    {
        //
    }
}
