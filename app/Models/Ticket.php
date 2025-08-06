<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    protected $fillable = [
        'user_id',
        'area',
        'process_id',
        'nivel_importancia',
        'descripcion',
        'estado',
        'fecha_apertura',
    ];

        public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function archivos(): HasMany
    {
        return $this->hasMany(TicketFile::class);
    }

    public function respuestas(): HasMany
    {
        return $this->hasMany(TicketResponse::class);
    }
}