<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    //id以外は自由にupdate、insertしてOK
    protected $guarded = ['id'];

    // アプリ上の操作で変更可能にしたいカラムを追加
    protected $fillable = [
        'icon',
        'jikoshokai',
    ];

    // リレーション設定
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
