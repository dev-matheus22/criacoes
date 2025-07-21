<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Painel do Usuário</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://unpkg.com/intro.js/minified/introjs.min.css" rel="stylesheet">
  <script src="https://unpkg.com/intro.js/minified/intro.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/lAibs/gsap/3.12.2/Draggable.min.js"></script>
  <link rel="shortcut icon" href="iconSapo.png" type="image/x-icon">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

      html, body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    
    * {
      box-sizing: border-box;
    }

  body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(135deg, #A8E6CF, #DCEDC1);  
    background-attachment: fixed;
    font-family: 'Montserrat Alternates', sans-serif;
    width: 100%;
    margin-top: 0px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .painel-usuario {
    flex-grow: 1;
    width: 100%;
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 30px;
  }

  .cor-navbar {
    background-color: #E0F7FA;
  }

  .fonte {
    font-family: 'Dancing script';
    color: #5e35b1;
  }

  .painel-usuario-bg {
    background: linear-gradient(135deg, #A8E6CF, #DCEDC1);
  }

  .card {
    margin-top: 20px;
    background-color:  #E0F7FA;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 800px;
  }

  .botoes-usuario {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  .botao-acao {
    border: none;
    padding: 15px 20px;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
    min-width: 200px;
    text-align: center;
  }

  .botao-acao:hover { transform: scale(1.08); cursor: pointer; }

  .botao-acao-enviar { background-color: #f44336; }
  .botao-acao-enviar:hover { background-color: #d32f2f; }

  .botao-acao-sugestoes { background-color: #2196f3; }
  .botao-acao-sugestoes:hover { background-color: #1976d2; }

  .botao-acao-relatar { background-color: #ff9800; }
  .botao-acao-relatar:hover { background-color: #f57c00; }

  .botao-acao-confirmar { background-color: #4caf50; }
  .botao-acao-confirmar:hover { background-color: #388e3c; }

  .botao-acao-criar-template { background-color: #9c27b0; }
  .botao-acao-criar-template:hover { background-color: #7b1fa2; }

  .botao-acao-sair { background-color: #6c757d; }
  .botao-acao-sair:hover { background-color: #495057; }

  #formBug, #formTemplate, #formCorreioElegante, #formConfirmarPresenca {
    display: none;
    background-color:  #E0F7FA;
    padding: 20px;
    margin-top: 20px;
  }

  .heart-effect {
    color: red;
    font-size: 2rem;
    animation: heartPulse 1s infinite;
  }

  .bg-correio-elegante {
    background: linear-gradient(135deg, #FF6F61, #D9A2A3);
  }

  .bg-editar-perfil {
    background: linear-gradient(135deg, #6F61FF, #A2A3D9);
  }

  .bg-relatar-bug {
    background: linear-gradient(135deg, #F57C00, #eb821a);
  }

  .bg-confirmar-presenca {
    background: linear-gradient(135deg, #61FF8D, #A3D9A2);
  }

  .bg-criar-template {
    background: linear-gradient(135deg, #7B1FA2, #6b2888);
  }
  
  .bg-emblemas {
    background: linear-gradient(135deg, #FFD700, #FFB800);
  }
  
  .bg-depoimentos{
    background: linear-gradient(135deg, #FD99A2, #FC6C85);
  }
  
  .bg-testar-quimica{
    background: linear-gradient(135deg, #8e2de2, #ff6ec4);
  }

  @keyframes heartPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }

  .customTooltip {
    background-color: #E0F7FA;
    color: #333;
    border-radius: 10px;
    padding: 15px;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .introjs-tooltip-title {
    font-weight: bold;
    color: #0d6efd;
  }

  .introjs-button {
    border-radius: 8px;
    padding: 8px 12px;
  }

  .introjs-skipbutton {
    color: #dc3545 !important;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0;
    text-align: center;
    color: #5e35b1;
    font-weight: bold;
  }
  
  .footer-custom {

    width: 100%;

    background-color: #E0F7FA;

    padding: 20px 30px;

    margin-top: 30px;

    text-align: center;

    font-weight: bold;

    display: flex;

    justify-content: center;

    align-items: center;

  }

  form, form label, form input, form textarea, form select, p > strong {
    color: #5e35b1;
  }

  .navbar .btn {
    border: 2px solid #7e57c2;
    border-radius: 8px;
    padding: 8px 16px;
    background-color: transparent;
    color: #7e57c2;
    transition: background-color 0.3s, color 0.3s;
  }

  .navbar .btn:hover {
  background-color: #7e57c2 !important;
  color: white !important;
}

  .navbar .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    margin-right: 30px;
  }

  .fonte{
      font-family: 'Dancing script';
      color: #5e35b1;
  }
  
    .text-center {
      color:  #7e57c2;
  }
  
  .text-paragrafo {
      color:  #7e57c2;
  }

.header-usuario {
  display: flex;
  flex-wrap: wrap; /* <- ADICIONE ESTA LINHA */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 10px;
  gap: 10px; /* opcional: adiciona espaçamento entre linhas no wrap */
}

#statusUsuario {
  max-width: 100%;
  min-width: 160px;
}

#pontosUsuario {
  font-weight: bold;
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
  white-space: nowrap; /* impede quebra interna */
  overflow-x: auto;
  max-width: 100%;
}

#bemVindo {
  margin: 0;
  font-size: 1.5rem;
  color: #5e35b1;
  text-align: center;
}

#pontosUsuario {
  font-weight: bold;
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
}

.emblema {
  width: 70px;  /* Tamanho pequeno */
  height: 70px; 
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 50%; /* Bordas arredondadas */
  background-color: #E0F7FA;

}

#musicListContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  gap: 10px; /* controla o espaçamento entre itens */
}

.music-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 19%; /* Cada item pega aproximadamente 19% com margem de segurança */
  box-sizing: border-box;
  padding: 5px;
  text-align: center;
  background-color: #E0F7FA;
  border-radius: 6px;
}


/* Imagem da música */
.music-image {
  width: 40px;
  height: auto;
  max-height: 40px;
  object-fit: cover;
  margin-top: 8px;
  border-radius: 6px;
}
  
  @media (max-width: 768px) {

.navbar-collapse {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #E0F7FA;
    border-radius: 10px;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}


  .navbar-nav {
    flex-direction: column;
    align-items: flex-end !important;/* faz os botões se alinharem à direita */
  }
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
              <i class="bi bi-shield-lock"></i> Adm
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

    <div class="painel-usuario">
      <div class="card">
        <div class="header-usuario">
          <h4 id="bemVindo">Bom te ver, sapinho 🐸!</h4>

          <div style="flex-grow: 1; text-align: center;">
          <select id="statusUsuario" class="form-select" value="status"
          data-intro="Seção status"
          data-step="1" style="background: linear-gradient(90deg, #ffc0cb, #dabfff); color: #555;">
            <option selected disabled>Status</option>
            <option value="true">Tô na pista</option>
            <option value="false">Hoje não, Faro!</option>
          </select>
        </div>

          <span id="pontosUsuario" data-intro="seção pontos" data-step="2">0 pts</span>
        </div>
    
        <div class="botoes-usuario">
          <button class="botao-acao botao-acao-enviar drag-btn" id="btnEnviarCorreioElegante"
            data-intro="Clique aqui para enviar um correio elegante para alguém do grupo!"
            data-step="3">
            <i class="bi bi-envelope"></i> Enviar correio elegante
          </button>
        
          <button class="botao-acao botao-acao-sugestoes drag-btn" id="btnVerPerfil"
            data-intro="Aqui você pode ver ou editar seu perfil."
            data-step="4">
            <i class="bi bi-pencil"></i> Editar perfil
          </button>
        
          <button class="botao-acao botao-acao-relatar drag-btn" id="relatarBugBtn"
            data-intro="Encontrou um erro? Relate um bug por aqui!"
            data-step="5">
            <i class="bi bi-bug"></i> Relatar um bug
          </button>
        
          <button class="botao-acao botao-acao-confirmar drag-btn" id="btnConfirmarPresenca"
            data-intro="Use esse botão para confirmar sua presença nos rolês!"
            data-step="6">
            <i class="bi bi-calendar-check"></i> Confirmar presença
          </button>
        
          <button class="botao-acao botao-acao-criar-template drag-btn" id="btnCriarTemplate"
            data-intro="Aqui você pode criar seu template de apresentação. Bem-vinde, sapinho!"
            data-step="7">
            <i class="bi bi-plus-circle"></i> Criar Template
          </button>
        
          <button id="btnEmblemas" class="botao-acao botao-acao-emblemas drag-btn" style="background-color: #FFD700; color: #fff;"
          data-intro="Seção dos emblemas";
          data-step="8">
            <i class="bi bi-award"></i> Emblemas
        </button>
        
        <li class="nav-item dropdown list-unstyled">
          <a class="btn botao-acao dropdown-toggle position-relative" id="btnDepoimentos" href="#" id="dropdownDepoimentos" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #FD99A2; color: #fff;"
          data-intro="Seção dos depoimentos"
          data-step="9">
            <i class="bi bi-chat-dots"></i> Depoimentos
              <span id="badgeDepoimentos" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="display: none;">!</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownDepoimentos">
            <li><a class="dropdown-item" href="#" id="verDepoimentos"><i class="bi bi-eye"></i> Ver depoimentos</a></li>
            <li><a class="dropdown-item" href="#" id="escreverDepoimento"><i class="bi bi-pencil-square"></i> Escrever depoimento</a></li>
          </ul>
        </li> 

        <div>

          <a class="btn botao-acao dropdown-toggle" id="btnTestarQuimica" style="background: linear-gradient(135deg, #8e2de2, #ff6ec4);"
          data-intro="Seção dos matches"
          data-step="10">
            <i class="bi bi-heart-pulse-fill"></i> Namoro Beija Sapo
          <a>

            </div>
          
        
        <button id="btnSecrets" class="botao-acao botao-acao-secrets drag-btn" style="    background: linear-gradient(135deg, #330033, #660033, #4B0082);
 color: #fff;"
          data-intro="Seção dos segredos";
          data-step="11">
            <i class="bi bi-eye"></i> Secrets
        </button>

        <a id="btnLoja" href="loja.html" class="botao-acao botao-acao-loja drag-btn" style="background-color: #8ce047; color: #fff; text-decoration: none;"
          data-intro="Seção dos brindes";
          data-step="12">
            <i class="bi bi-shop"></i> Brindes
        </a>

        <a id="btnJogos" href="jogos.html" class="botao-acao botao-acao-jogos drag-btn" style="background-color: #a738d3; color: #fff; text-decoration: none;"
          data-intro="Seção dos jogos";
          data-step="13">
            <i class="bi bi-controller"></i> Jogos
        </a>
        
          <button class="botao-acao botao-acao-sair drag-btn" id="btnSair"
            data-intro="Clique aqui para sair do painel."
            data-step="14">
            <i class="bi bi-door-open"></i> Sair
          </button>
        </div>

    
        <!-- Formulário de Correio Elegante -->
        <div id="formCorreioElegante">
          <h5 class="text-center">❤️ Enviar Correio Elegante ❤️</h5>
          <p class="text-center">Utilize essa seção para enviar aquela paquera para alguém do grupo!</p>
          <form id="correioForm">
            <div class="mb-3">
              <label for="destinatario" class="form-label">Destinatário</label>
              <input type="text" class="form-control" id="destinatario" required placeholder="@fulano ou apenas fulano">
            </div>
            <div class="mb-3">
              <label for="remetente" class="form-label">Remetente</label>
              <input type="text" class="form-control" id="remetente" required placeholder="Seu nome ou anônimo">
            </div>
            <div class="mb-3">
              <label for="mensagem" class="form-label">Mensagem</label>
              <textarea class="form-control" id="mensagem" rows="4" required  placeholder="Agora é a hora xD"></textarea>
            </div>
            <button type="submit" class="btn btn-warning">Enviar</button>
          </form>
          <div id="correioStatus" class="mt-2 text-success" style="display:none;">Mensagem enviada com sucesso! <span class="heart-effect">❤️</span></div>
        </div>

        <!-- Formulário de editar perfil -->

    
        <!-- Formulário de Bug -->
        <div id="formBug">
          <h5 class="text-center">Relatar um Bug</h5>
          <p class="text-center">Encontrou um bug? Relate aqui!</p>
          <form id="bugForm">
            <div class="mb-3">
              <label for="titulo" class="form-label">Título</label>
              <input type="text" class="form-control" id="titulo" required>
            </div>
            <div class="mb-3">
              <label for="descricao" class="form-label">Descrição</label>
              <textarea class="form-control" id="descricao" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-warning">Enviar Bug</button>
          </form>
          <div id="bugStatus" class="mt-2 text-success" style="display:none;">Bug enviado com sucesso!</div>
        </div>
    

        <!-- Formulário de Template -->
        <div id="formTemplate" class="container mt4"> 
          <form id="templateForm">
            <h5 class="text-center">Criar template</h5>
            <p class="text-center">Gere seu template de apresentação aqui, mas lembre-se de adicionar sua foto ao template do whatsapp</p>
            <br>
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome">
              </div>

              <div class="col-md-4">
                <label class="form-label">Idade:</label>
                <input type="text" class="form-control" id="idade">
              </div>

              <div class="col-md-4">
                <label class="form-label">Aniversário:</label>
                <input type="text" class="form-control" id="aniversario">
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Signo:</label>
                <input type="text" class="form-control" id="signo">
              </div>

              <div class="col-md-6">
                <label class="form-label">Altura:</label>
                <input type="text" class="form-control" id="altura">
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">Cidade e Bairro (SP):</label>
                <input type="text" class="form-control" id="cidadeBairro">
              </div>

              <div class="col-md-4">
                <label class="form-label">Estado Civil:</label>
                <input type="text" class="form-control" id="estadoCivil">
              </div>

              <div class="col-md-4">
                <label class="form-label">Instagram:</label>
                <input type="text" class="form-control" id="instagram">
              </div>
            </div>
            
            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label">Hobbies:</label>
                <input type="text" class="form-control" id="hobbies">
              </div>
            </div>
            <button type="button" class="btn btn-success" id="gerarTemplate">Gerar Template</button>
          </form>
        </div>

    
        <div id="resultadoTemplate" style="display: none; white-space: pre-line; margin-top: 20px;"></div>
        <button id="copiarTexto" class="btn btn-secondary mt-3" style="display: none;">Copiar texto</button>
        
       <div id="perfilContainer">
        <div class="card">
        <h5 class="text-center mb-4">Veja ou edite suas informações aqui!</h5>
        <div class="card-body">
          <div class="text-center my-3">
            <img id="fotoPerfil" src="adms/default.png" class="rounded-circle mb-2" style="width: 150px; height: 150px; object-fit: cover;" alt="Foto de Perfil">
            <br>
            <button id="btnAlterarFoto" class="btn btn-primary btn-sm mt-2">🖼️ Alterar foto de perfil</button>
            <input type="file" id="uploadFoto" class="form-control mt-2" accept="image/*" style="display: none;">
          </div>

      <p><strong>Nome:</strong> <span id="perfilNome"></span> <button class="btn btn-warning btn-sm" id="editNome" style="color: #fff">✏️ Editar</button></p>
      <p>
      <strong>SapoId:</strong>
      <span id="perfilUsername"></span>
      <input type="text" id="inputUsername" class="form-control d-none mt-2" placeholder="Novo username">
      <button class="btn btn-warning btn-sm" id="editUsername" style="color: #fff">✏️ Editar</button>
      <button class="btn btn-success btn-sm d-none mt-2" id="salvarUsername">💾 Salvar</button>
      </p>
      <p><strong>Cidade:</strong> <span id="perfilCidade"></span> <button class="btn btn-warning btn-sm" id="editCidade" style="color: #fff">✏️️ Editar</button></p>
      <p><strong>Telefone:</strong> <span id="perfilTelefone"></span> <button class="btn btn-warning btn-sm" id="editTelefone" style="color: #fff">✏️ Editar</button></p>
      <p><strong>Idade:</strong> <span id="perfilIdade"></span> <button class="btn btn-warning btn-sm" id="editIdade" style="color: #fff">✏️ Editar</button></p>
      <p><strong>Email:</strong> <span id="perfilEmail"></span> <button class="btn btn-warning btn-sm" id="editEmail" style="color: #fff">✏️ Editar</button></p>
      <p><strong>Sobre Você:</strong> <span id="perfilSobre"></span> <button class="btn btn-warning btn-sm" id="editSobre" style="color: #fff">✏️ Editar</button></p>
      <h5 class="text-center">🎵 Música do Perfil</h5>
        <p class="text-paragrafo">Conecte-se com sua conta do Spotify e escolha a música que aparecerá no seu perfil.</p>
        <div id="musicSection" style="display: none;"> <!-- Seção para mostrar as músicas depois da conexão -->
          <h5 class="text-center">Minhas Músicas Mais Tocadas:</h5>
          <ul style="list-style: none;" id="musicListContainer" class="text-paragrafo"> <!-- Container onde as músicas/artistas serão listados -->
            <!-- As músicas serão inseridas aqui dinamicamente -->
          </ul>
        </div>
        <button id="loginSpotify" class="btn btn-success">Conectar com Spotify <i class="bi bi-spotify"></i></button>
        
        

    </div>
  </div>
</div>

        <!-- Formulário Confirmar Presença -->
        <div id="formConfirmarPresenca" style="display: none;">
          <h5 class="text-center">Confirme sua presença</h5>
          <p class="text-center">Vai no rolê? Confirme aqui sua presença!</p>
          <div id="rolêInfo">
            <p style="color: #5e35b1;">Rolê: <span id="nomeRole"></span></p>
            <p style="color: #d3c15e;">Data: <span id="dataRole"></span></p>
          </div>
          <div class="text-center">
            <button id="btnVou" class="btn btn-success me-2">Vou</button>
            <button id="btnNaoVou" class="btn btn-danger">Não vou</button>
          </div>
          <div id="presencaStatus" class="mt-2 text-success text-center" style="display:none;">
            Presença confirmada!
          </div>
          <div id="presencaStatusNao" class="mt-2 text-danger text-center" style="display:none;">
           Então tá!
          </div>
        </div>
        
        
        
        <!--Depoimentos-->

        <form id="formDepoimentos" style="display: none;" class="card">
            <h5 class="text-center">Escreva um depoimento para outro sapinho!</h5>
            <br>
          <div class="mb-3">
            <label for="tituloDepoimento" class="form-label">Título do Depoimento</label>
            <input type="text" class="form-control" id="tituloDepoimento" placeholder="Ex: Amizade especial">
          </div>
        
          <div class="mb-3">
            <label for="usuarioDepoente" class="form-label">Seu nome de usuário</label>
            <input type="text" class="form-control" id="usuarioDepoente" placeholder="Ex: sapinho_fofo">
          </div>
        
          <div class="mb-3">
            <label for="usuarioDestino" class="form-label">Enviar para</label>
            <select class="form-select" id="usuarioDestino">
              <option selected disabled>Selecione um usuário</option>
              <!-- As opções serão preenchidas via JS -->
            </select>
          </div>
        
          <div class="mb-3">
            <label for="textoDepoimento" class="form-label">Seu Depoimento</label>
            <textarea class="form-control" id="textoDepoimento" rows="5" placeholder="Conte algo especial..."></textarea>
          </div>
        
          <button type="submit" class="btn btn-primary" style="background-color: #5e35b1; border-color: #5e35b1;">
            Enviar Depoimento
          </button>
        </form>

        <div id="listaDepoimentos" class="card mt-3 p-3" style="display: none;">
          <h5 class="text-center">Depoimentos recebidos</h5>
          <div id="depoimentosContainer"></div>
        </div>

        <div class="card mt-3" id="cardQuimica" style="display: none;">
          <h5 class="text-center mb-3">💘 Testar a Química</h5>
        
          <ul class="nav nav-tabs justify-content-center" id="tabsQuimica" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="tab-usuarios" data-bs-toggle="tab" data-bs-target="#tabUsuarios" type="button" role="tab">Usuários Online</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-enviados" data-bs-toggle="tab" data-bs-target="#tabEnviados" type="button" role="tab">Enviados</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-recebidos" data-bs-toggle="tab" data-bs-target="#tabRecebidos" type="button" role="tab">Recebidos</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-matches" data-bs-toggle="tab" data-bs-target="#tabMatches" type="button" role="tab">Matches</button>
            </li>
          </ul>
        
          <div class="tab-content mt-3" id="conteudoAbas">
            <div class="tab-pane fade show active" id="tabUsuarios" role="tabpanel">
              <form id="formTestarQuimica" style="background-color: #E0F7FA; padding: 20px; border-radius: 8px;" class="mx-auto mt-3" autocomplete="off">
                <div class="mb-3">
                  <p id="contadorDisponiveis" class="text-center mt-2 text-muted"></p>
                  <h5 class="text-center" style="color: #5e35b1;">Escolha o sapinho para dar um Hop:</h5>
                  <div id="usuariosDisponiveisContainer" class="row mt-3 g-3"></div>
                </div>
              </form>
            </div>
        
            <div class="tab-pane fade" id="tabEnviados" role="tabpanel">
              <div id="convitesContainer" class="mt-3"></div>
            </div>
        
            <div class="tab-pane fade" id="tabRecebidos" role="tabpanel">
              <div id="recebidosContainer" class="mt-3"></div>
            </div>
        
            <div class="tab-pane fade" id="tabMatches" role="tabpanel">
              <div id="matchesContainer" class="mt-3"></div>
            </div>
          </div>
        </div>

        

        <div class="modal fade" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: #F8F8F8;">
              <div class="modal-header" style="background-color: #6A1B9A; color: white; border-bottom: none;">
                <h5 class="modal-title" id="perfilModalLabel">Perfil de <span id="modalUserName"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center">
                <img id="modalUserFoto" src="" alt="Foto de Perfil" class="rounded-circle mb-3" style="width: 120px; height: 120px; object-fit: cover; border: 3px solid #8e2de2;">
                <p class="lead" id="modalUserStatus" style="color: #5e35b1;"></p>
                <hr>
                <h6 style="color: #7e57c2;">Sobre:</h6>
                <p id="modalUserSobre" style="text-align: justify; padding: 0 15px;"></p>
                </div>
                <hr>
                <h6 style="color: #7e57c2;">Emblemas selecionados:</h6>
                <div id="modalUserEmblemas" class="d-flex justify-content-center flex-wrap gap-2"></div>
              <div class="modal-footer justify-content-center" style="border-top: none;">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
          </div>
        </div>
        
        <!-- Chat-->
        
        <div id="chatContainer" class="card mt-3 p-3" style="display: none;">
          <h5 id="chatTitulo"></h5>
          <div id="chatMensagens" class="border p-3 mb-3" style="height: 200px; overflow-y: auto;"></div>
          <div class="input-group">
  <!-- Botão para selecionar imagem -->
          <button class="btn btn-outline-secondary" id="btnIconeImagem" type="button" title="Enviar imagem">
                  <i class="bi bi-image"></i>
          </button>
        
          <!-- Campo de digitar mensagem -->
          <input type="text" class="form-control" id="mensagemInput" placeholder="Digite sua mensagem...">
        
          <!-- Botão de enviar texto -->
          <button class="btn btn-success" id="btnEnviar">Enviar</button>
        
          <!-- Campo oculto de seleção de imagem -->
          <input type="file" id="imagemInput" accept="image/*" style="display: none;">
        </div>
        </div>


        <!-- // Secrets -->
         <div id="secretsContainer" class="card mt-3 p-3" style="display: none;">
          <h5 class="text-center">Conte-nos um segredo!</h5>
        
          <div class="mb-3">
            <label for="secretsTitulo" class="form-label" class="text-center">Título do segredo</label>
            <input type="text" class="form-control" id="secretsTitulo" placeholder="Ex: Algo que ninguém sabe...">
          </div>
        
          <div class="mb-3">
            <label for="secrets" class="form-label" class="text-center">Seu segredo</label>
            <textarea class="form-control" id="secrets" rows="5" placeholder="Conte algo secreto..."></textarea>
          </div>
        
          <button id="enviarSegredo" class="btn btn-primary">Enviar</button>
        </div>


        
        <div id="emblemasSection" style="display: none;">
  <div class="card" style="border-radius: 8px; background-color: #E0F7FA; padding: 15px;">
    <h3 class="text-center">Emblemas</h3>

    <p id="contadorSelecionados" class="text-center text-muted mt-2">0/4 selecionados</p>

    <div id="emblemasContainer" class="d-flex flex-wrap gap-2">
      <!-- Emblemas clicáveis serão inseridos aqui via JavaScript -->
    </div>

    <div class="text-center mt-3">
      <button id="salvarEmblemasSelecionados" class="btn btn-success">Salvar Emblemas Selecionados</button>
    </div>
  </div>
</div>

      
      
    </div>
    </div> <!-- fecha .painel-usuario -->
    
    <footer class="footer-custom">
  <div class="footer-content">
        <p>© 2025 Beija Sapo - Todos os direitos reservados</p>
      <p>Desenvolvido com 💜 para o grupo</p>  </div>
</footer>

    

<script type="module" src="js/painelUser.js">

</script>

</body>
</html>