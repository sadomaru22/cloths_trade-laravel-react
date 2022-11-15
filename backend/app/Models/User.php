<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    //確実にここが関与してる
    // protected static function booted()
    // {
    //     // static::creating(function ($user) {
    //     //     $user->id = (string)Str::uuid();
    //     // });
    // }

    // /**
    //  * Indicates if the model's ID is auto-incrementing.
    //  *
    //  * @var bool
    //  */
    // public $incrementing = false;

    // /**
    //  * The data type of the auto-incrementing ID.
    //  *
    //  * @var string
    //  */
    // protected $keyType = 'string';


    //id以外は自由にupdate、insertしてOK
    protected $guarded = ['id'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function tradePost()
    {
        return $this->hasMany(TradePost::class);
    }

    // public function userInfo()
    // {
    //     return $this->hasOne(UserInfo::class);
    // }
}
