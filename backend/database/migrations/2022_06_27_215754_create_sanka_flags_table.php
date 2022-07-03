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
    public function up()
    {
        Schema::create('sanka_flags', function (Blueprint $table) {
            $table->bigIncrements('id');   //unique
            $table->unsignedBigInteger('user_id')->default(1);   //参加申請押した時のuser_idが入る
            $table->unsignedBigInteger('trade_post_id');
            $table->boolean('pending_flag')->default(false);
            $table->boolean('confirmed_flag')->default(false);
            $table->timestamps();

            $table->foreign('trade_post_id')
                ->references('id')->on('trade_posts')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sanka_flags');
    }
};
