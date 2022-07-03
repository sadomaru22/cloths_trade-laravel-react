<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SankaFlag extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // アプリ上の操作で変更可能にしたいカラムを追加
    protected $fillable = [
        'pending_flag',
        'confirmed_flag'
    ];

    // リレーション設定
    public function tradepost()
    {
        return $this->belongsTo(TradePost::class);
    }
}
