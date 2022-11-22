<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Http\Controllers\ProfileInformationController as Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;
use Illuminate\Support\Facades\Log;
use App\Models\User;

/**
 * It extends \Laravel\Fortify\Http\Controllers\ProfileInformationController
 */
class ProfileInformationController extends Controller
{
   /**
    * Display the authenticated user
    *
    * @return \Illuminate\Http\JsonResponse
    */
   public function show()
   {
      return new UserResource(Auth::user());
   }

   /**
    * Update the user's profile information.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Laravel\Fortify\Contracts\UpdatesUserProfileInformation  $updater
    * @return \Illuminate\Http\Response
    */
   public function updateOriginal(Request $request)
   {
      Log::debug($request);
      Log::debug($request->jikoshokai . '自己紹介');
      $id = Auth::id();
      Log::debug($id . "=AuthId");
      $user = User::find($id);
      $user->name = $request->name;
      $user->icon = $request->icon;
      $user->email = $request->email;
      $user->jikoshokai = $request->jikoshokai;

      $user->save();
      // $user->update([
      //    //'name' => $request->name,
      //    'icon' => $request->icon,
      //    'email' => $request->email,
      //    'jikoshokai' => $request->jikoshokai,
      // ]);
      return $user;
      //$updater->update($request->user(), $request->all());

      // return $request->wantsJson()
      //    ? new JsonResponse('', 200)
      //    : back()->with('status', 'profile-information-updated');
   }
}
