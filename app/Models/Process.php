<?php

amespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'area_id'];

    /**
     * Relación: un proceso tiene muchos usuarios
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}