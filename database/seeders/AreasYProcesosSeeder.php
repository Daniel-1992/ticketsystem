<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;
use App\Models\Process;

class AreasYProcesosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear las áreas
        $areas = [
            'Ventas',
            'Marketing',
            'Finanzas',
            'RRHH',
            'Sistemas',
            'Dirección'
        ];

        $ids = [];
        foreach ($areas as $area) {
            $ids[$area] = Area::create(['name' => $area])->id;
        }

        // Solo el área de Sistemas tendrá procesos
        $procesosSistemas = [
            'Desarrollo Web',
            'Soporte',
            'Redes'
        ];

        foreach ($procesosSistemas as $proceso) {
            Process::create([
                'name' => $proceso,
                'area_id' => $ids['Sistemas']
            ]);
        }
    }
}
