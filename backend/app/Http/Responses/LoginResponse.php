<?php

namespace App\Http\Responses;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Log;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        // 認証メールリンクからのアクセスの場合
        $path = $request->session()->get('url.intended');
        if ($path) return redirect()->intended();
        // echo '<script>';
        // echo 'console.log(' . json_encode(Auth::user()) . ')';
        // echo 'console.log(' . テスト . ')';
        // echo '</script>';
        var_dump($request);
        Log::debug($request);

        //`vendor/laravel/fortify/src/Http/Responses/LoginResponse.php`転記
        return $request->wantsJson()
            ? response()->json([
                'user' => new UserResource(Auth::user()),
                'two_factor' => false
            ])
            : redirect()->intended(config('fortify.home'));
        //return User::where('email', $request->mail);
        //return Auth::user();
    }
}
