<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Director
        User::create([
            'name' => 'Director General',
            'email' => 'director@example.com',
            'password' => Hash::make('12345678'),
            'role' => 'director'
        ]);

        // Usuario
        User::create([
            'name' => 'Usuario Prueba',
            'email' => 'usuario@example.com',
            'password' => Hash::make('12345678'),
            'role' => 'usuario'
        ]);

        // Soporte
        User::create([
            'name' => 'Soporte Técnico',
            'email' => 'soporte@example.com',
            'password' => Hash::make('12345678'),
            'role' => 'soporte'
        ]);
    }
}