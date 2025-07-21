 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
        import { getFirestore, collection, getDocs, orderBy, query, limit, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDkMTTM5yJbyIzjCl3vovJXx1dlNEX2IpU",
            authDomain: "beija-sapo.firebaseapp.com",
            projectId: "beija-sapo",
            storageBucket: "beija-sapo.firebasestorage.app",
            messagingSenderId: "429297677162",
            appId: "1:429297677162:web:3792b9546b7b44a16e6b13"
        };
    
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        


    
        let participantes = [];
        let chaveStorage = null;
        let idDoRoleAtual = null;
    
    
        // Buscar o último rolê criado
        
        async function fetchLastRole() {
            const q = query(collection(db, "roles"), orderBy("dataRole", "desc"), limit(1));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0];
                const role = docRef.data();
                idDoRoleAtual = docRef.id; // <- aqui salvamos o ID do documento

                const nomeRole = role.nomeRole;
                const dataRole = role.dataRole;

                chaveStorage = `participantes_${nomeRole}_${dataRole}`;
                participantes = JSON.parse(localStorage.getItem(chaveStorage)) || [];

                document.getElementById("roleTitulo").innerHTML =
                `Novo rolê marcado!<br>🗺️: ${nomeRole}<br>📅: ${dataRole} às ${role.horaRole}<br>📍: ${role.enderecoRole}`;
            } else {
                document.getElementById("roleTitulo").textContent = "Nenhum rolê agendado";
            }

        }
        
        // Inicializar página
        fetchLastRole();
    
       

        document.getElementById("sugestoesReclamacoesForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const titulo = document.getElementById("titulo").value;
  const sobreAlguem = document.getElementById("sobreAlguem").value;
  const mensagem = document.getElementById("mensagemSugestao").value;

  try {
    await addDoc(collection(db, "sugestoesReclamacoes"), {
      tipo,
      titulo,
      sobreAlguem,
      mensagem,
      timestamp: new Date()
    });

    // Resetar o formulário
    e.target.reset();

    // Mostrar mensagem de sucesso
    const sucessoMsg = document.createElement("p");
    sucessoMsg.textContent = "Reclamação/Sugestão enviada com sucesso!";
    sucessoMsg.style.color = "green";
    sucessoMsg.style.marginTop = "10px";
    document.getElementById("sugestoesReclamacoesForm").appendChild(sucessoMsg);

    // Remover a mensagem após alguns segundos
    setTimeout(() => {
      sucessoMsg.remove();
    }, 5000);

  } catch (error) {
    console.error("Erro ao enviar sugestão:", error);
  }
});

const listaEventos = document.getElementById('listaEventos');

async function carregarEventos() {
  try {
    console.log('Tentando carregar os eventos do mês...');
    const querySnapshot = await getDocs(collection(db, 'eventosMes'));
    listaEventos.innerHTML = '';

    if (querySnapshot.empty) {
      console.log('Nenhum evento encontrado.');
    }

    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      console.log('Evento encontrado:', dados);

      const li = document.createElement('li');
      li.className = 'text-center unstyled';
      li.textContent = dados.descricao;

      listaEventos.appendChild(li);
    });

    console.log('Eventos carregados com sucesso.');
  } catch (error) {
    console.error('Erro ao carregar os eventos:', error);
  }
}

carregarEventos();

// Ranking 

const rankingLista = document.getElementById("rankingLista");

async function carregarRanking() {
  try {
    const rankingRef = collection(db, "ranking");
    const q = query(rankingRef, orderBy("posicao", "asc"));
    const snapshot = await getDocs(q);

    rankingLista.innerHTML = "";

    if (snapshot.empty) {
      rankingLista.innerHTML = "<li>Nenhum ranking disponível.</li>";
      return;
    }

    snapshot.docs.forEach(doc => {
      const user = doc.data();
      const posicao = user.posicao;
      const medalha = posicao === 1 ? "🥇" : posicao === 2 ? "🥈" : posicao === 3 ? "🥉" : "";
      const li = document.createElement("li");

      li.innerHTML = `#${posicao} ${medalha} - ${user.username} - ${user.pontos} pts`;
      li.style.color = "#5e35b1";
      rankingLista.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar ranking:", error);
    rankingLista.innerHTML = "<li>Erro ao carregar ranking.</li>";
  }
}


carregarRanking();

async function carregarEmpreendedores() {
  const container = document.getElementById("listaEmpreendedores");

  try {
    const querySnapshot = await getDocs(collection(db, "empreendedores"));
    if (querySnapshot.empty) {
      container.innerHTML = `<p class="text-center">Nenhum empreendimento divulgado ainda.</p>`;
      return;
    }

    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      const imagem = Array.isArray(dados.fotos) ? dados.fotos[0] : dados.imagemUrl || "";

      const col = document.createElement("div");
      col.className = "col-md-4 mb-4"; // 3 cards por linha
      col.innerHTML = `
        <div class="card h-100 shadow-sm" style="border-radius: 12px;">
          <img src="${imagem}" class="card-img-top" style="max-height: 200px; object-fit: cover;" alt="Imagem do negócio">
          <div class="card-body text-center">
            <h5 class="card-title">${dados.titulo}</h5>
            <p class="card-text">${dados.corpo}</p>
            <a href="${dados.link}" target="_blank" class="btn btn-success">Entrar em contato</a>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  } catch (error) {
    console.error("Erro ao carregar empreendedores:", error);
  }
}

carregarEmpreendedores();