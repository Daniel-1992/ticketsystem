<h2>Hola {{ $ticket->usuario->name }},</h2>

<p>Tu ticket con ID <strong>#{{ $ticket->id }}</strong> ha sido respondido por el área de soporte.</p>

<p><strong>Descripción:</strong> {{ $ticket->descripcion }}</p>

<p>Por favor revisa el sistema para ver la respuesta completa.</p>

<hr>
<p>Este es un mensaje automático del sistema de tickets.</p>
