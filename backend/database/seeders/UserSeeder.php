<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
   // public static User $guestUser;
   // public static User $anotherUser;

   /**
    * Run the database seeds.
    *
    * @return void
    */
   public function run()
   {
      //   self::$guestUser = User::factory()->create([
      //       'name' => env('GUEST_NAME'),
      //       'email' => env('GUEST_EMAIL'),
      //       'password' => Hash::make(env('GUEST_PASSWORD')),
      //   ]);

      //   self::$anotherUser = User::factory()->create();
      User::factory()->create();

      // DB::table('users')->insert([
      //    'name' => '山田太郎',
      //    'icon' => 'http://profile-icon.jpeg',
      //    'email' => Str::random(10) . '@gmail.com',
      //    'email_verified_at' => now(),
      //    'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      //    //'password' => Hash::make("password"),
      //    'jikoshokai' => '自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。',
      //    'remember_token' => Str::random(10),
      // ]);
   }
}
