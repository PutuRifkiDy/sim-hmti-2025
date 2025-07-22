<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('oprecs', function (Blueprint $table) {
            $table->id();
            $table->string('oprec_name');
            $table->string('description');
            $table->dateTimeTz('start_date');
            $table->dateTimeTz('end_date');
            $table->string('postmsg')->nullable();
            $table->string('poster_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oprecs');
    }
};
