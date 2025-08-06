<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = ['Ventas', 'Marketing', 'Finanzas', 'RRHH', 'Sistemas', 'Dirección'];
        foreach ($areas as $area) {
            \App\Models\Area::create(['nombre' => $area]);
        }
    }
}
