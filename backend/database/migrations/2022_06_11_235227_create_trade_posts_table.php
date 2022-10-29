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
            $table->unsignedBigInteger('user_id')->default();
            $table->string('title', 190)->default();
            $table->dateTime('date')->default(date('Y-m-d'));
            $table->integer('sankasya')->default(0);
            $table->integer('maxCapa')->default(0);
            $table->string('place', 10)->default('東京都');
            $table->string('description', 500)->default();
            $table->string('thumbnail', 1000)->default('https://images.unsplash.com/photo-1663568399694-fa3ee4fbb972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NTQ5MTU1MA&ixlib=rb-1.2.1&q=80&w=1080');
            //$table->boolean('done')->default(false);         
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
