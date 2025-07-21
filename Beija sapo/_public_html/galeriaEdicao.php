<?php 
require_once 'config/db.php';
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Galeria de Rolês</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="shortcut icon" href="iconSapo.png" type="image/x-icon">

    <style>
        body {
            background: linear-gradient(135deg, #A8E6CF, #DCEDC1);
            display: flex;
            flex-direction: column; /* Adicionado */
            min-height: 100vh;
            margin: 0;
            padding: 40px 15px 0; /* Deixamos o padding-bottom 0 para o footer colar no fim */
        }

        .container {
            max-width: 1000px;
            background-color: #E0F7FA;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            flex: 1; /* Faz a container ocupar o espaço e empurrar o footer */
            margin: 0 auto; /* Centraliza */
        }

        .album-title {
            color: #7e57c2;
            border-bottom: 2px solid #eab308;
            padding-bottom: 8px;
            margin-top: 40px;
            margin-bottom: 25px;
        }

        .image-card {
            background-color: #f9f9f9;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            transition: transform 0.2s;
        }

        .image-card:hover {
            transform: scale(1.02);
        }

        .image-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .image-info {
            padding: 10px;
            text-align: center;
        }

        /* Modal personalizado */
        .modal-content {
            width: 90%;
            max-width: 800px;
            position: relative;
            text-align: center;
        }

        .modal-body img {
            width: 100%;
            height: auto;
        }

        .modal-nav {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
            padding: 0 20px;
        }

        .nav-button {
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            padding: 8px 16px;
            border-radius: 50%;
            cursor: pointer;
        }

        .nav-button:hover {
            background: rgba(0, 0, 0, 0.8);
        }

        .footer-custom {
            margin-top: 30px;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            padding: 20px 30px;
            text-align: center;
            font-weight: bold;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
            color: #5e35b1;
        }
        
    </style>
</head>
<body>

<div class="container">
    <h1 class="text-center mb-4" style="color: #7e57c2">📸 Galeria de Fotos</h1>
    <h5 class="text-center" style="color: #7e57c2">Aqui você encontra os álbuns de fotos do grupo!</h5>

    <div class="mb-4 text-start">
        <a href="painelAdm.html" class="btn btn-warning">
            <i class="bi bi-arrow-left-circle"></i> Voltar ao painel adm
        </a>
    </div>

    <?php
$sqlAlbuns = "SELECT * FROM album";
$albuns = $conn->query($sqlAlbuns);

if ($albuns->num_rows > 0) {
    while ($album = $albuns->fetch_assoc()) {
        $id_album = $album['id_album'];

        $sqlImgs = "SELECT * FROM imagens WHERE id_album = $id_album";
        $imagens = $conn->query($sqlImgs);

        if ($imagens->num_rows > 0) {
            echo "<h3 class='album-title'>" . htmlspecialchars($album['titulo_album']) . "</h3>";
            echo "<div class='row'>";

            while ($img = $imagens->fetch_assoc()) {
                echo "<div class='col-md-4'>";
                echo "  <div class='image-card'>";
                echo "      <a href='#' data-bs-toggle='modal' data-bs-target='#imageModal' data-bs-img='upload/" . htmlspecialchars($img['imagem']) . "'>";
                echo "          <img src='upload/" . htmlspecialchars($img['imagem']) . "' alt='Imagem do rolê'>";
                echo "      </a>";
                echo "      <div class='image-info'>";
                echo "          <strong>" . htmlspecialchars($img['titulo']) . "</strong><br><br>";

                // Aqui começa o formulário de exclusão
                echo "          <form action='excluir.php' method='POST' onsubmit='return confirmarExclusao()'>";
                echo "              <input type='hidden' name='id_imagem' value='" . intval($img['id_imagem']) . "'>";
                echo "              <input type='hidden' name='caminho_imagem' value='upload/" . htmlspecialchars($img['imagem']) . "'>";
                echo "              <button type='submit' class='btn btn-danger btn-sm'>";
                echo "                  <i class='bi bi-trash'></i> Excluir";
                echo "              </button>";
                echo "          </form>";

                echo "      </div>";
                echo "  </div>";
                echo "</div>";
            }

            echo "</div>";
        }
    }
} else {
    echo "<p class='text-center'>Ainda não há álbuns ou imagens cadastrados.</p>";
}
?>
    

</div>

    <footer class="footer-custom">
    <div class="footer-content">
        <p>&copy; 2025 Beija Sapo - Todos os direitos reservados</p>
        <p>Desenvolvido com 💜 para o grupo</p>
    </div>
</footer>

<!-- Modal de visualização da imagem -->
<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body position-relative">
                <div class="modal-nav">
                    <button class="nav-button" id="prevImage">&lt;</button>
                    <button class="nav-button" id="nextImage">&gt;</button>
                </div>
                <img id="modalImage" src="" alt="Imagem ampliada">
            </div>
        </div>
    </div>
</div>



<script>
    document.addEventListener('DOMContentLoaded', function () {
        const imageLinks = document.querySelectorAll('a[data-bs-toggle="modal"]');
        const modalImage = document.getElementById('modalImage');
        const prevButton = document.getElementById('prevImage');
        const nextButton = document.getElementById('nextImage');

        let images = [];
        let currentIndex = 0;

        imageLinks.forEach((link, index) => {
            images.push(link.getAttribute('data-bs-img'));

            link.addEventListener("click", function (event) {
                event.preventDefault();
                currentIndex = index;
                showImage();
            });
        });

        function showImage() {
            modalImage.src = images[currentIndex];
        }

        prevButton.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage();
        });

        nextButton.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % images.length;
            showImage();
        });
    });
</script>

</body>
</html>
