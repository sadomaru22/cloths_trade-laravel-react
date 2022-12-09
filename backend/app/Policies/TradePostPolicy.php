<?php

namespace App\Policies;

use App\Models\TradePost;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

//https://readouble.com/laravel/8.x/ja/authorization.html
class TradePostPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        // Allow viewing of only authenticated user data.
        // ※ `originalParameter()` doesn't bind model. (cf. `parameter()`)
        return $user->id ===
            request()
            ->route()
            ->originalParameter('user');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, TradePost $tradePost)
    {
        return $user->id === $tradePost->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        // Allow creating of only authenticated user data.
        return $user->id ===
            request()
            ->route()
            ->originalParameter('user');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, TradePost $tradePost)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, TradePost $tradePost)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, TradePost $tradePost)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TradePost  $tradePost
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, TradePost $tradePost)
    {
        //
    }
}
