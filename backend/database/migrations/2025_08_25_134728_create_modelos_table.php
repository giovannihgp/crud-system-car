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
        Schema::create('modelos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 20);
            $table->integer('numero_portas');
            $table->boolean('air_bag');
            $table->boolean('abs');
            $table->foreignId('marca_id')->references('id')->on('marcas');
            // $table->foreignId('marca_id')->constrained('marcas')->onDelete('cascade');
            // $table->longText('imagem')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modelos');
    }
};
