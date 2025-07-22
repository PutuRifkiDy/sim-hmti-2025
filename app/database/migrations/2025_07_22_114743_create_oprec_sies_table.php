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
        Schema::create('oprec_sies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('oprec_id')->constrained('oprecs')->cascadeOnDelete();
            $table->foreignId('sie_id')->constrained('master_sies')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oprec_sies');
    }
};
