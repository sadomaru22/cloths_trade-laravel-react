<?php

use App\Http\Controllers\SinseiController;
use App\Http\Resources\UserResource;
use App\Http\Controllers\TradePostController;
use App\Http\Controllers\TradePost2Controller;
use App\Http\Controllers\Auth\ProfileInformationController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

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

Route::get('/home', fn () => Auth::user());

/*
|--------------------------------------------------------------
|  Version 1.0
|--------------------------------------------------------------
*/
Route::group([
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'v1',
    'middleware' => 'auth:sanctum',
], function () {
    /*
    |--------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------
    */
    Route::get('/user', function (Request $request) {  //いらんかも
        return $request->user();
    });
    Route::get('/get-user', fn () => new UserResource(Auth::user()));
    Route::get('/users/auth', fn () => new UserResource(Auth::user()));

    Route::delete('/users/auth', function (Request $request) {
        $request->user()->delete();
        return response()->json([], 204);
    });
    Route::put('/user/profile-information2', [ProfileInformationController::class, 'updateOriginal']);

    /*
    |--------------------------------------------------------------
    | TradePost
    |--------------------------------------------------------------
    */
    Route::apiResource('/users/{user}/trade_posts', TradePostController::class);
    Route::get('/get-other-user/{user}', function ($user) {
        Log::debug($user);
        return new UserResource(User::find($user));
    });

    /*
    |--------------------------------------------------------------
    | TradePost2  過去、予定、確定、参加者、検索
    |--------------------------------------------------------------
    */
    Route::get('/trade_posts/past/{id}', [TradePost2Controller::class, 'past']);
    Route::get('/trade_posts/confirmed/{id}', [TradePost2Controller::class, 'confirmed']);
    Route::get('/trade_posts/pending/{id}', [TradePost2Controller::class, 'pending']);
    Route::get('/trade_posts/sankasya/{id}', [TradePost2Controller::class, 'sankasya']);
    Route::get('/trade_posts/searchBySb/{place}', [TradePost2Controller::class, 'searchBySb']);
    Route::put('/trade_posts/edit_others', [TradePost2Controller::class, 'updateOthers']);
    Route::post('/trade_posts/edit_photos', [TradePost2Controller::class, 'updatePhotos']);
    Route::post('/trade_posts/delete_photos', [TradePost2Controller::class, 'deletePhotos']);
    Route::get('/trade_posts/withIsPending/{user}', [TradePost2Controller::class, 'indexWithIsPending']);
    Route::get('/trade_posts/pendingUsers/{id}', [TradePost2Controller::class, 'showPendingUsers']);
    Route::get('/trade_posts/confirmedUsers/{id}', [TradePost2Controller::class, 'showConfirmedUsers']);

    /*
    |--------------------------------------------------------------
    | Sinsei  参加、取消(参加)、受理、取消(主催)
    |--------------------------------------------------------------
    */
    Route::post('/sinsei/sanka', [SinseiController::class, 'sanka']);
    Route::post('/sinsei/delsan', [SinseiController::class, 'delsan']);
    Route::post('/sinsei/juri', [SinseiController::class, 'juri']);
    Route::post('/sinsei/delsyu', [SinseiController::class, 'delsyu']);
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
