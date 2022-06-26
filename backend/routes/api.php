<?php

use App\Http\Resources\UserResource;
use App\Http\Controllers\TradePostController;
use App\Http\Controllers\TradePost2Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/home', function () {
    return Auth::user();
});

Route::group([
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'v1',
    //'middleware' => 'auth:sanctum',
], function () {
    /*
    |--------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------
    */
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //Route::get('/users/auth', fn () => new UserResource(Auth::user()));  //謎のエラー
    Route::delete('/users/auth', function (Request $request) {
        $request->user()->delete();
        return response()->json([], 204);
    });

    /*
    |--------------------------------------------------------------
    | TradePost
    |--------------------------------------------------------------
    */
    Route::apiResource('/users/{user}/trade_posts', TradePostController::class);

    /*
    |--------------------------------------------------------------
    | TradePost2  過去、予定、確定、検索
    |--------------------------------------------------------------
    */
    // Route::get('/users/{user}/trade_posts/past', [TradePost2Controller::class, 'past']);
    // Route::get('/users/{user}/trade_posts/pending', [TradePost2Controller::class, 'pending']);
    // Route::get('/users/{user}/trade_posts/confirmed', [TradePost2Controller::class, 'confirmed']);
    // Route::get('/users/{user}/trade_posts/search', [TradePost2Controller::class, 'search']);
});

/*
|--------------------------------------------------------------
| Not Found
|--------------------------------------------------------------
*/
Route::any('/{any?}', function ($any = null) {
    return response()->json(
        [
            'error' => [
                'title' => '404 Not Found',
                'message' => 'The requested URL was not found!!!',
            ],
        ],
        404,
    );
})->where('any', '.*');
