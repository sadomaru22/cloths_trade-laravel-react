<?php

namespace Database\Seeders;

use App\Models\TradePost;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TradePostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 作成する`TradePost`が属する`User`を事前に作成
        $user = User::factory()->create();

        // 'User'に属するデータを10件生成
        TradePost::factory()->count(10)->for($user)->create();
    }
}
