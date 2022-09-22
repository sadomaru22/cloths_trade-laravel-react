<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    //     public function up()
    //     {
    //         Schema::create('user_infos', function (Blueprint $table) {
    //             $table->bigIncrements('id');   //unique
    //             $table->unsignedBigInteger('user_id');
    //             $table->string('icon')->default('http://profile-icon.jpeg');
    //             $table->string('jikoshokai', 300)->default('自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。自己紹介。');;
    //             $table->timestamps();
    //             $table->foreign('user_id')
    //                 //->constrained('users') // 外部キー制約
    //                 ->references('id')->on('users')
    //                 ->onUpdate('cascade')
    //                 ->onDelete('cascade');
    //         });
    //     }

    //     /**
    //      * Reverse the migrations.
    //      *
    //      * @return void
    //      */
    //     public function down()
    //     {
    //         Schema::dropIfExists('user_info');
    //     }
};
