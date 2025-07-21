<?php
require_once 'config/db.php';
session_start();

// Verifica se o formulário foi enviado via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_imagem = $_POST['id_imagem'];
    $caminho_imagem = $_POST['caminho_imagem'];

    // Excluir a imagem do banco de dados
    $sqlExcluir = "DELETE FROM imagens WHERE id_imagem = ?";
    $stmt = $conn->prepare($sqlExcluir);
    $stmt->bind_param("i", $id_imagem);
    
    if ($stmt->execute()) {
        // Excluir o arquivo de imagem do servidor
        if (file_exists($caminho_imagem)) {
            unlink($caminho_imagem);
        }
         header('Location: galeriaEdicao.php'); // Redirecionar para galeriaEdicao.php após a exclusão
        exit;
    } else {
        echo "Erro ao excluir a imagem.";
    }

    $stmt->close();
}

$conn->close();
?>
