<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TradePost;
use App\Models\SankaFlag;

class SinseiController extends Controller
{
    public function sanka()  //post
    {
        $sanka = SankaFlag::create();
        return;
    }

    public function delsan()   //delete
    {
        return;
    }

    public function juri()    //update
    {
        return;
    }

    public function delsyu()    //delete
    {
        return;
    }
}
