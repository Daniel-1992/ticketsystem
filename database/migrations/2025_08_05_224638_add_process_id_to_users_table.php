<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Agrega la llave foránea
            $table->foreignId('process_id')->nullable()
                  ->constrained('processes')
                  ->onDelete('set null')
                  ->after('email');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['process_id']);
            $table->dropColumn('process_id');
        });
    }
};
