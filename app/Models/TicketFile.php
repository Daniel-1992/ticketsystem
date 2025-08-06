<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketFile extends Model
{
    protected $fillable = [
        'ticket_id',
        'path',
        'nombre_original',
        'mime',
        'size',
    ];
}