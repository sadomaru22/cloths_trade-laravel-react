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
        Schema::create('trade_posts', function (Blueprint $table) {
            //$table->id();
            $table->bigIncrements('id');   //unique
            $table->unsignedBigInteger('user_id');
            $table->string('title', 190);
            $table->dateTime('date')->default(date('Y-m-d'));
            $table->integer('maxCapa')->default(0);
            $table->string('place', 10)->default('東京都');
            $table->text('description');
            //$table->boolean('done')->default(false); // 初期値設定            
            $table->timestamps();

            $table->foreign('user_id')
                //->constrained('users') // 外部キー制約
                ->references('id')->on('users')
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
        Schema::dropIfExists('trade_posts');
    }
};
