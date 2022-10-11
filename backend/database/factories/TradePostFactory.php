<?php

namespace Database\Factories;

use App\Models\TradePost;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TradePost>
 */
class TradePostFactory extends Factory
{

    protected $model = TradePost::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => 1,
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
        ];
    }
}
