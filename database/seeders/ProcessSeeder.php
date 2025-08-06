<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProcessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $procesos = ['Desarrollo Web', 'Soporte', 'Redes'];
        foreach ($procesos as $proceso) {
            \App\Models\Process::create(['nombre' => $proceso]);
        }
    }
    
}
