<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $errores = [];

    // Validación de los campos
    if (empty($_POST["tipoProyecto"])) {
        $errores[] = "El campo 'Tipo de Proyecto' es obligatorio.";
    }
    if (empty($_POST["tipoPiscina"])) {
        $errores[] = "El campo 'Tipo de Piscina' es obligatorio.";
    }
    if (empty($_POST["nombre"])) {
        $errores[] = "El campo 'Nombre' es obligatorio.";
    }
    if (empty($_POST["apellidos"])) {
        $errores[] = "El campo 'Apellidos' es obligatorio.";
    }
    if (empty($_POST["telefono"]) || !preg_match('/^[1-9][0-9]{2}[0-9]{6,7}$/', $_POST["telefono"])) {
        $errores[] = "El campo 'Teléfono' es obligatorio y debe tener un formato válido.";
    }
    if (empty($_POST["email"]) || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El campo 'Email' es obligatorio y debe tener un formato válido.";
    }
    if (empty($_POST["provincia"])) {
        $errores[] = "El campo 'Provincia' es obligatorio.";
    }
    if (empty($_POST["ciudad"])) {
        $errores[] = "El campo 'Ciudad' es obligatorio.";
    }

    if (!empty($errores)) {
        echo json_encode([
            "success" => false,
            "message" => "Se encontraron errores en el formulario.",
            "errors" => $errores
        ]);
        exit;
    }

    // Configuración del correo
    $destinatario = "ventas@ceracor.com.ar";
    $asunto = "Solicitud de Presupuesto - CampRosaGres";

    $tipoProyecto = htmlspecialchars($_POST["tipoProyecto"]);
    $tipoPiscina = htmlspecialchars($_POST["tipoPiscina"]);
    $nombre = htmlspecialchars($_POST["nombre"]);
    $apellidos = htmlspecialchars($_POST["apellidos"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $email = htmlspecialchars($_POST["email"]);
    $provincia = htmlspecialchars($_POST["provincia"]);
    $ciudad = htmlspecialchars($_POST["ciudad"]);
    $contacto = isset($_POST["contacto"]) ? implode(", ", $_POST["contacto"]) : "No especificado";

    $mensaje = "
    <html>
    <head>
        <title>Solicitud de Presupuesto</title>
    </head>
    <body>
        <h2>Detalles de la Solicitud:</h2>
        <p><strong>Tipo de Proyecto:</strong> $tipoProyecto</p>
        <p><strong>Tipo de Piscina:</strong> $tipoPiscina</p>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Apellidos:</strong> $apellidos</p>
        <p><strong>Teléfono:</strong> $telefono</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Provincia:</strong> $provincia</p>
        <p><strong>Ciudad:</strong> $ciudad</p>
        <p><strong>Preferencia de Contacto:</strong> $contacto</p>
    </body>
    </html>";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: no-reply@ceracor-CampRosaGres.com.ar" . "\r\n";

    if (mail($destinatario, $asunto, $mensaje, $headers)) {
        echo json_encode([
            "success" => true,
            "message" => "Hemos recibido tu consulta, te contactaremos lo antes posible."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al enviar tu consulta. Por favor, inténtalo de nuevo más tarde."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Acceso no permitido."
    ]);
}
?>
