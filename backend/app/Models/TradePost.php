<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TradePost extends Model
{
    use HasFactory;

    // アプリ上の操作で変更可能にしたいカラムを追加
    protected $fillable = [
        'title',
        'date',
        'maxCapa',
        'place',
        'description'
    ];

    // リレーション設定
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
