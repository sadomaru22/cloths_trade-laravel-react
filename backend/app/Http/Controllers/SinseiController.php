<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TradePost;
use App\Models\SankaFlag;

class SinseiController extends Controller
{
    public function sanka()
    {
        $sanka = SankaFlag::create();
        return;
    }

    public function delsan()
    {
        return;
    }

    public function juri()
    {
        return;
    }

    public function delsyu()
    {
        return;
    }
}
