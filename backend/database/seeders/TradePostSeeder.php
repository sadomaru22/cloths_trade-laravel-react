<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\SankaFlag;
use App\Models\TradePost;
use App\Models\User;
use App\Models\UserInfo;
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
        // 作成する`TradePost`が属する`User`を事前に作成(UserInfoは必ずセットで作成)
        //$user = User::factory()->has(UserInfo::factory()->count(1))->create();
        //$user = User::factory()->create();

        // 'User'に属するデータを10件生成
        //1対多のSankaFlagも同時に3件
        //1対多のImageも同時に3件
        TradePost::factory()->has(SankaFlag::factory()->count(3))
            ->has(Image::factory()->count(3))
            //->count(10)->for($user)->create();
            ->count(10)->create();
    }
}
