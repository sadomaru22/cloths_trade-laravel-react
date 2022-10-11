<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    // リレーション設定
    public function tradepost()
    {
        return $this->belongsTo(TradePost::class);
    }
}
