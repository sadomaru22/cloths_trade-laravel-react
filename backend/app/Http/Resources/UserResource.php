<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * Response時にDataをjsonにするときに噛ませる用に使われる
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'email' => $this->email,
            'emailVerifiedAt' => $this->email_verified_at,
            'jikoshokai' => $this->jikoshokai,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string
     */
    // デフォルトのキー`data`を変更
    public static $wrap = 'user';
}
