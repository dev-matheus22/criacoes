<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fontawesome/4.7.0/css/font-awesome.min.css">
    <title>Listagem de amigos</title>
</head>
<body>
    <a href="index.php">
        <i class="bi bi-arrow-return-left" style="width: 150px; height: 50px;"></i>
    </a>
    <?php 
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "amizades";
        $conexao = new mysqli($servername, $username, $password, $dbname);
        if ($conexao->connect_error) {
            die("Connection failed: ". $conexao->connect_error);
        }
        echo '
        <div class="container">
        <h1 class="bg-primary">Listagem de amigos</h1>
        <table class="table">
        <thead>
        <tr class="w3-center w3-teal">
        <th scope="col">Código</th>
        <th scope="col">Nome</th>
        <th scope="col">Apelido</th>
        <th scope="col">Email</th>
        <th scope="col">Excluir</th>
        <th scope="col">Atualizar</th>
        </tr>
        <thead>
        ';

        $sql = "SELECT * FROM amizades";
        $resultado = $conexao->query($sql);
        if ($resultado != null) 
        foreach($resultado as $linha){
            echo '<tr>';
            echo '<td>'.$linha['idamigo'].'</td>';
            echo '<td>'.$linha['nome'].'</td>';
            echo '<td>'.$linha['apelido'].'</td>';
            echo '<td>'.$linha['email'].'</td>';
            echo '<td><a href="excluir.php?id='.$linha['idamigo'].'&no
            me='.$linha['nome'].'&apelido='.$linha['apelido'].'&email='.$linha['email'].'"
            ><i class="fa fa-user-times w3-large w3-text-teal"></i> </a></td></td>';
            echo '<td><a href="atualizar.php?id='.$linha['idamigo'].'&
            nome='.$linha['nome'].'&apelido='.$linha['apelido'].'&email='.$linha['email'].
            '"><i class="fa fa-refresh w3-large w3-text-teal""></i></a></td></td>';
            echo '</tr>';
    
        } echo '
            </table>
            </div>
        ';
        $conexao->close();
    ?>
</body>
</html>