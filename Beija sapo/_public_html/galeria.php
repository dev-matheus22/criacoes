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
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body {
            background: linear-gradient(135deg, #A8E6CF, #DCEDC1);
            display: flex;
            flex-direction: column; /* Adicionado */
            min-height: 100vh;
            margin: 0;
            padding: 40px 15px 0; /* Deixamos o padding-bottom 0 para o footer colar no fim */
            font-family: 'Montserrat Alternates';
        }

        .container {
            max-width: 1000px;
            background-color: #E0F7FA;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            flex: 1; /* Faz a container ocupar o espaço e empurrar o footer */
            margin: 0 auto; /* Centraliza */
            margin-top: 100px;
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
            background-color: #E0F7FA;
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
        
        .cor-navbar {
    background-color: #E0F7FA   ;
}

    /* Estilizar os botões da navbar */
    .navbar-nav .btn {
      border: 2px solid #7e57c2; /* cor da borda roxa */
      border-radius: 8px;
      padding: 8px 16px;
      background-color: transparent; /* manter o fundo da navbar */
      color: #7e57c2; /* cor do texto */
      transition: background-color 0.3s, color 0.3s;
    }
    
    /* Efeito hover */
    .navbar-nav .btn:hover {
      background-color: #7e57c2;
      color: white;
    }
    
    /* Centralizar melhor os elementos */
    .navbar .container-fluid {
      display: flex;
      justify-content: space-between;
        align-items: center;
    }
    
    .fonte{
      font-family: 'Dancing script';
      color: #5e35b1;
}
    
    @media (max-width: 768px) {
    .navbar-collapse {
        position: end;
        top: 60px;
        right: 0;
        background-color: #E0F7FA;
        border-radius: 10px;
        width: 1000px;
        padding: 0px;
        display: flex;
        justify-content: flex-end !important;/* Isso aqui força os itens pra direita */
      }
    
      .navbar-nav {
        flex-direction: column;
        align-items: flex-end !important;/* faz os botões se alinharem à direita */
      }
        
    </style>
</head>
<body>
    
    <nav class="navbar navbar-expand-lg  cor-navbar fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">
           <img src="Logo.webp" alt="" width="40" height="40" class="d-inline-block align-text-top">
            <span class="fonte">Beija Sapo</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav gap-2" style="margin-left: -270px;">
          <li class="nav-item">
            <a class="btn" href="index.html">
              <i class="bi bi-house-door"></i> Home
            </a>
          </li>
          <li class="nav-item">
            <a class="btn" href="loginAdm.html">
              <i class="bi bi-shield-lock"></i> ADM
            </a>
          </li>
          <li class="nav-item">
            <a class="btn" href="loginUser.html">
              <i class="bi bi-person"></i> Usuário
            </a>
          </li>
          <li class="nav-item">
            <a class="btn" href="cadastroUsuario.html">
              <i class="bi bi-person-plus"></i> Cadastre-se
            </a>
          </li>
          <li class="nav-item">
            <a class="btn" href="galeria.php">
              <i class="bi bi-image"></i> Galeria
            </a>
          </li>
          <li class="nav-item">
            <a class="btn" href="secrets.html">
              <i class="bi bi-key"></i> Secrets
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    
<div class="container">
    <h1 class="text-center mb-4" style="color: #7e57c2">📸 Galeria de Fotos</h1>
    <h5 class="text-center" style="color: #7e57c2">Aqui você encontra os álbuns de fotos do grupo!</h5>

    <div class="mb-4 text-start">
        <a href="index.html" class="btn btn-warning">
            <i class="bi bi-arrow-left-circle"></i> Voltar
        </a>
    </div>

    <?php
    $sqlAlbuns = "SELECT * FROM album ORDER BY id_album DESC";
    $albuns = $conn->query($sqlAlbuns);

    if ($albuns->num_rows > 0) {
        while ($album = $albuns->fetch_assoc()) {
            $id_album = $album['id_album'];

            $sqlImgs = "SELECT * FROM imagens WHERE id_album = $id_album ORDER BY id_imagem ASC";
            $imagens = $conn->query($sqlImgs);

            if ($imagens->num_rows > 0) {
                echo "<h3 class='album-title'>" . htmlspecialchars($album['titulo_album']) . "</h3>";
                echo "<div class='row'>";

                while ($img = $imagens->fetch_assoc()) {
                    echo "<div class='col-md-4'>";
                    echo "  <div class='image-card'>";
                    echo "<a href='#' data-bs-toggle='modal' data-bs-target='#imageModal' data-bs-img='upload/" . $img['imagem'] . "'>";
                    echo "<img src='upload/" . $img['imagem'] . "' alt='Imagem do rolê'>";
                    echo "</a>";
                    echo "      <div class='image-info'>";
                    echo "          <strong>" . htmlspecialchars($img['titulo']) . "</strong><br>";
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
