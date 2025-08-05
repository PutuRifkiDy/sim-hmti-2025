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
        Schema::create('master_financials', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('month');
            $table->integer('total_income')->default(0);
            $table->foreignId('period_id')->constrained('master_periods')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_financials');
    }
};
