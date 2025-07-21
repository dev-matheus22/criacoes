<?php
require_once 'config/db.php';

$mensagem = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $titulo = $_POST['titulo'];
    $nome_role = trim($_POST['nome_role']);
    $id_album = null;

    // Verificar se já existe um álbum com o nome do rolê
    $stmt = $conn->prepare("SELECT id_album FROM album WHERE titulo_album = ?");
    $stmt->bind_param("s", $nome_role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id_album = $row['id_album'];
    } else {
        // Criar novo álbum se não existir
        $stmtInsert = $conn->prepare("INSERT INTO album (titulo_album) VALUES (?)");
        $stmtInsert->bind_param("s", $nome_role);
        if ($stmtInsert->execute()) {
            $id_album = $stmtInsert->insert_id;
        } else {
            $mensagem = "Erro ao criar novo álbum.";
        }
        $stmtInsert->close();
    }

    $stmt->close();

    // Gerar nome único para a imagem
    foreach ($_FILES['image']['tmp_name'] as $index => $tmpName) {
    if ($_FILES['image']['error'][$index] === UPLOAD_ERR_OK) {
        $originalName = basename($_FILES['image']['name'][$index]);
        $uniqueName = uniqid() . '_' . $originalName;
        $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/upload/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fullPath = $uploadDir . $uniqueName;

        if (move_uploaded_file($tmpName, $fullPath)) {
            $imageRelativePath = $uniqueName;
            $sql = "INSERT INTO imagens (id_album, imagem, titulo) VALUES ('$id_album', '$imageRelativePath', '$titulo')";
            if ($conn->query($sql) === TRUE) {
                $mensagem = "Imagens carregadas com sucesso!";
            } else {
                $mensagem = "Erro ao salvar no banco: " . $conn->error;
            }
        } else {
            $mensagem = "Erro ao fazer upload da imagem $originalName.";
        }
    }
}


    // Definir o diretório de uploads
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . "/upload/"; // Mudado para o diretório correto
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Caminho completo da imagem
    $imagePath = $uploadDir . $imageName;
    $imageRelativePath = $imageName; // só o nome, sem o "upload/"
// Salvar com nome único
    
    // Mover o arquivo para o diretório de upload
    if (move_uploaded_file($imageTmpName, $imagePath)) {
        // Inserir imagem no banco
        $sql = "INSERT INTO imagens (id_album, imagem, titulo) VALUES ('$id_album', '$imageRelativePath', '$titulo')";
        if ($conn->query($sql) === TRUE) {
            $mensagem = "Imagem carregada com sucesso!";
        } else {
            $mensagem = "Erro ao salvar no banco: " . $conn->error;
        }
    } else {
        $mensagem = "Erro ao fazer upload da imagem.";
    }
}
$conn->close();
?>

<!-- Código HTML do formulário de upload -->
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Upload de Imagem</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="shortcut icon" href="iconSapo.png" type="image/x-icon">


    <style>
        body {
            background: linear-gradient(135deg, #A8E6CF, #DCEDC1);    
            background-size: auto 100%;
            background-position: center;
            background-repeat: repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .card {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 30px;
            width: 100%;
            max-width: 600px;
        }

        .form-label {
            color: #5e35b1;
        }

        .form-control:focus {
            border-color: #a78bfa;
            box-shadow: 0 0 0 0.25rem rgba(167, 139, 250, 0.25);
        }

        .btn-primary {
            background-color: #facc15;
            border-color: #facc15;
            color: #fff;
        }

        .btn-primary:hover {
            background-color: #eab308;
            border-color: #eab308;
        }

        .mensagem {
            margin-bottom: 15px;
            color: green;
            font-weight: bold;
        }
    </style>    
</head>
<body>

<div class="card">
    <h4 class="text-center mb-4">Upload de Imagem para o Rolê</h4>

    <?php if (!empty($mensagem)): ?>
        <div class="mensagem text-center"><?= htmlspecialchars($mensagem) ?></div>
    <?php endif; ?>

    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="nome_role" class="form-label">Nome do rolê</label>
            <input type="text" class="form-control" name="nome_role" id="nome_role" required placeholder="Ex: shopping, igreja, praia">
        </div>

        <div class="mb-3">
            <label for="titulo" class="form-label">Título da imagem</label>
            <input type="text" class="form-control" name="titulo" id="titulo" required>
        </div>

        <div class="mb-3">
            <label for="image" class="form-label">Imagem</label>
            <input type="file" class="form-control" name="image[]" id="image" multiple required>
        </div>

        <button type="submit" class="btn btn-primary w-100">
            <i class="bi bi-upload me-1"></i> Enviar
        </button>
        <a href="galeriaEdicao.php" class="btn btn-primary w-100 mt-2">
            <i class="bi bi-pencil-square me-1"></i>Editar galeria</a>
        <a href="painelAdm.html" class="btn btn-primary w-100 mt-2">
            <i class="bi bi-arrow-return-left"></i>Voltar</a>

    </form>
</div>

</body>
</html>
