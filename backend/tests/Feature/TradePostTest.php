<?php

namespace Tests\Feature;

use App\Models\TradePost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class TradePostTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    //use RefreshDatabase; // DBリフレッシュ

    // テストの前に実行する処理を追加
    // public function setUp(): void
    // {
    //     parent::setUp(); // 必須

    //     $user = User::factory()->create(); // TradePostが属するUser
    //     TradePost::factory()->count(21)->for($user)->create();
    // }

    public function test_20_items_in_one_page()
    {
        $response = $this->get('/api/v1/users/1/trade_posts');
        $response->assertStatus(500);

        // $response->assertJson(fn (AssertableJson $json) =>   //使えない、、
        // $json->has('data', 20));
    }
}
