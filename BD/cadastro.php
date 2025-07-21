<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <title>Cadastro - MySQLi</title>
</head>
<body class="bg-success">
    <a href="index.php" class="text-white" style="margin: 20px; display: inline-block;">
        <i class="bi bi-arrow-return-left" style="font-size: 24px;"></i> Voltar
    </a>

    <div class="container bg-white rounded shadow p-4" style="max-width: 600px; margin-top: 50px;">
        <div class="bg-success text-primary p-3 rounded">
            <h1 class="text-center">Cadastro de Amigos</h1>
        </div>

        <form action="cadastroAction.php" class="form-group mt-3">
            <label class="text-primary">Código</label>
            <input name="txtID" class="form-control" disabled>
            <label class="text-primary">Nome</label>
            <input name="txtNome" type="text" class="form-control">
            <label class="text-primary">Apelido</label>
            <input name="txtApelido" class="form-control" type="text">
            <label class="text-primary">Email</label>
            <input name="txtEmail" class="form-control" type="text">
            <button class="btn btn-primary m-4" name="btnAdicionar">
                <i class="bi bi-plus-square" style="margin-right: 5px;"></i>
                Adicionar
            </button>
        </form>
    </div>
</body>
</html>
