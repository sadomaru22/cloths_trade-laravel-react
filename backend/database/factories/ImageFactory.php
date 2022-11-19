<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{

    protected $model = Image::class;

    public function definition()
    {
        return [
            //'trade_post_id' => 2,
            'file_name' => 'https://source.unsplash.com/random'
        ];
    }
}
