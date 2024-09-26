
<!DOCTYPE html>
<html>
<head>
    <title>Crear Cliente</title>
</head>
<body>
    <h1>Crear Nuevo Cliente</h1>
    <form method="POST" action="{{ route('clientes.store') }}">
@csrf
<label for="nombre_cliente">Nombre:</label>
<input type="text" id="nombre_cliente" name="nombre_cliente" required>

<label for="rut">RUT:</label>
<input type="text" id="rut" name="rut" required>

<!-- Añade los demás campos aquí -->

<button type="submit">Crear Cliente</button>
</form>
</body>
</html>
