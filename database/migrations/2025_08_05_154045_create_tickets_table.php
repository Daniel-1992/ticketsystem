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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Usuario que lo abre
            $table->foreignId('process_id')->constrained()->onDelete('cascade');
            $table->enum('nivel_importancia', ['Baja', 'Media', 'Alta', 'Urgente']);
            $table->text('descripcion');
            $table->enum('estado', ['abierto', 'cerrado', 'reabierto'])->default('abierto');
            $table->timestamp('fecha_apertura')->useCurrent();
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
