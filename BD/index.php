<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <title>Projeto MySQLi</title>
    <style>
        .container-title {
            margin-bottom: 20px; /* Espaçamento entre o título e os botões */
        }
        .btn-container .col {
            margin-bottom: 15px; /* Espaçamento vertical entre os botões */
        }
    </style>
</head>
<body>
    <!-- Cabeçalho -->
    <div class="container bg-success container-title">
        <h1 class="h1 text-center" style="color: white">Projeto lista de amigos</h1>
    </div>

    <!-- Botões -->
    <div class="container">
        <div class="row text-center btn-container">
            <!-- Botão Adicionar -->
            <div class="col-sm-6">
                <a href="cadastro.php" class="btn btn-success" style="display: block;">
                    <i class="bi bi-person-add" style="font-size: 10.5em;"></i>
                    <p style="font-size: 2em; color: white;">Adicionar</p>
                </a>
            </div>
            <!-- Botão Lista -->
            <div class="col-sm-6">
                <a href="listar.php" class="btn btn-success" style="display: block;">
                    <i class="bi bi-card-list" style="font-size: 10.5em;"></i>
                    <p style="font-size: 2em; color: white;">Listar</p>
                </a>
            </div>
        </div>
    </div>
</body>
</html>
