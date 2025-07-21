  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, updateEmail, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  import {
  getFirestore, doc, getDoc, getDocs, setDoc, orderBy, limit,
  query, where, updateDoc, collection, addDoc, serverTimestamp, arrayUnion, deleteDoc, onSnapshot, increment,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
  import { getStorage, ref, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";





  const firebaseConfig = {
    apiKey: "AIzaSyDkMTTM5yJbyIzjCl3vovJXx1dlNEX2IpU",
    authDomain: "beija-sapo.firebaseapp.com",
    projectId: "beija-sapo",
    storageBucket: "beija-sapo.firebasestorage.app",
    messagingSenderId: "429297677162",
    appId: "1:429297677162:web:3792b9546b7b44a16e6b13"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Spotify
  
   document.getElementById('loginSpotify').addEventListener('click', e => {
    e.preventDefault();
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.location.href = authUrl;
  });

  const clientId    = '58aababbb9c34fb89478fc534f734a10';
  const redirectUri = 'https://beijasapo.com/painelUser.php';
  const scopes      = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played'
  ];

  const processSpotifyCode = (code, userId) => {
    return fetch('trocar_token.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    .then(r => r.json())
    .then(json => {
      if (!json.access_token) {
        throw new Error(`Erro trocando token: ${JSON.stringify(json)}`);
      }
      return fetch('https://api.spotify.com/v1/me/top/tracks?limit=8', {
        headers: { 'Authorization': `Bearer ${json.access_token}` }
      });
    })
    .then(r => {
      if (!r.ok) {
        return r.json().then(err => {
          throw new Error(`Spotify API ${r.status}: ${err.error?.message || 'Unknown error'}`);
        });
      }
      return r.json();
    })
    .then(spotifyData => {
  console.log("5 Top Tracks:", spotifyData.items);

  const userTracksRef = collection(db, "usuarios", userId, "musicas_top");

  return getDocs(userTracksRef).then(snapshot => {
    const deletes = snapshot.docs.map(doc => deleteDoc(doc.ref));
    return Promise.all(deletes);
  })
  
  .then(() => {
    const saves = spotifyData.items.map(track =>
      addDoc(userTracksRef, {
        nome:      track.name,
        artista:   track.artists.map(a => a.name).join(', '),
        imagem:    track.album.images[0]?.url || '',
        timestamp: new Date()
      })
    );
    return Promise.all(saves);
  });
})
.then(() => console.log("Faixas substituídas com sucesso!"))

    .then(() => console.log("Faixas salvas com sucesso!"))
    .catch(err => console.error("Erro no Spotify→Firebase:", err));
  };
  
const displayTopTracks = (userId) => {
  const musicRef = collection(db, "usuarios", userId, "musicas_top");

  getDocs(musicRef)
    .then(snapshot => {
      const musicListContainer = document.getElementById("musicListContainer");

      musicListContainer.innerHTML = '';

      snapshot.forEach(doc => {
        const music = doc.data();
        const listItem = document.createElement('li');

        listItem.classList.add('music-item');
        listItem.innerHTML = `
        
        <div>
            <h6>${music.nome}</h6>
            <p>${music.artista}</p>
          </div>
          <img src="${music.imagem}" alt="${music.nome}" class="music-image" />
          
        `;

        musicListContainer.appendChild(listItem);
      });

      document.getElementById("musicSection").style.display = 'block';
    })
    .catch(err => {
      console.error("Erro ao buscar as músicas:", err);
    });
};

function iniciarTour() {
    introJs().setOptions({
      nextLabel: 'Próximo',
      prevLabel: 'Voltar',
      doneLabel: 'Fechar',
      skipLabel: 'Pular',
      tooltipClass: 'customTooltip',
      steps: [
        {
          element: document.querySelector('#btnEnviarCorreioElegante'),
          intro: 'Aqui você pode mandar um correio elegante para o crush ❤️'
        },
        {
          element: document.querySelector('#btnEditarPerfil'),
          intro: 'É extremamente importante que você definnisa seu username e aqui é o lugar pra isso!'
        },
        {
          element: document.querySelector('#relatarBugBtn'),
          intro: 'Achou algum bug estranho? Tipo... um sapo pulando no código? Relata aqui! 🐞'
        },
        {
          element: document.querySelector('#btnConfirmarPresenca'),
          intro: 'Confirme sua presença nos eventos do grupo e não fique de fora! 📅'
        },
        {
          element: document.querySelector('#btnCriarTemplate'),
          intro: 'Chegou agora e quer se apresentar? Crie seu template aqui, novo sapinho! 🐸'
        },
        {
          element: document.querySelector("#btnEmblemas"),
          intro: 'Existem emblemas automáticos, de progresso, presenças em rolês e por pontos'
        },
        {
          element: document.querySelector("#btnDepoimentos"),
          intro: 'Quer demonstrar carinho pra um amigo? Envie um depoimento pra ele!'
        },
        {
          element: document.querySelector("#btnTestarQuimica"),
          intro: 'A versão pobre do grindr, mas sem anúncios! Se der match, o número de telefone do user aparecerá na seção matches!'
        },
        {
          element:document.querySelector("#statusUsuario"),
          intro: 'Altere seu status para tentar um match, ou não'
        },
        {
          element: document.querySelector("#pontosUsuario"),
          intro: 'Participe dos rolês e ganhe pontos + emblemas!'
        },
        {
            element: document.querySelector("btnSecrets"),
            intro: 'Compartilhe um segredo com a gente, é tudo anônimo!'
        },
        {
            element: document.querySelector("btnBrindes"),
            intro: 'Troque seus pontos por brindes'
        },
        {
          element: document.querySelector("btnJogos"),
          intro: 'Divirta-se com os jogos e suba no ranking'
        },
        {
          element: document.querySelector('.botao-acao-sair'),
          intro: 'Se quiser sair (mas só se for rapidinho hein?), clique aqui.'
        }
      ]
    }).start();
  }

  window.onload = function () {
  const jaViuTour = localStorage.getItem("tourVisto");

  if (!jaViuTour) {
    setTimeout(() => {
      iniciarTour();
      localStorage.setItem("tourVisto", "true");
    }, 1000);
  }
};

  
   document.getElementById("btnSair").addEventListener("click", async () => {
    try {
      await signOut(auth); 
      console.log("Usuário deslogado");
      window.location.href = "index.html";  
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  });

    let usuarioDocId = null; 
    


const uploadFotoPerfil = async (file, userId) => {
  try {
    const storageRef = ref(storage, `fotosPerfil/${userId}.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const userDocRef = doc(db, "usuarios", userId);
    await updateDoc(userDocRef, { fotoPerfil: url });

    document.getElementById("fotoPerfil").src = url;
    console.log("Foto de perfil atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
  }
};

const editarCampo = (campoId, campoValor) => {
  const campoSpan = document.getElementById(campoId);
  const valorAtual = campoSpan.textContent;

  campoSpan.innerHTML = `<input type="text" value="${valorAtual}" id="input${campoId}" />`;

  const botaoSalvar = document.createElement("button");
  botaoSalvar.classList.add("btn", "btn-primary", "btn-sm");
  botaoSalvar.textContent = "Salvar";

  botaoSalvar.onclick = async () => {
    const novoValor = document.getElementById(`input${campoId}`).value;

    try {
      const usuarioDocRef = doc(db, "usuarios", usuarioDocId);
      await updateDoc(usuarioDocRef, {
        [campoValor]: novoValor
      });
      campoSpan.textContent = novoValor;
    } catch (error) {
      console.error("Erro ao salvar alteração:", error);
    }
  };

  campoSpan.innerHTML += " ";
  campoSpan.appendChild(botaoSalvar);
};

// Função específica para editar username com verificação de duplicidade
const editarCampoUsername = (campoId, campoValor) => {
  const campoSpan = document.getElementById(campoId);
  const valorAtual = campoSpan.textContent;

  campoSpan.innerHTML = `<input type="text" value="${valorAtual}" id="input${campoId}" />`;

  const botaoSalvar = document.createElement("button");
  botaoSalvar.classList.add("btn", "btn-primary", "btn-sm");
  botaoSalvar.textContent = "Salvar";

  botaoSalvar.onclick = async () => {
    const novoValor = document.getElementById(`input${campoId}`).value.trim();

    if (!novoValor) {
      alert("O campo SapoId não pode estar vazio.");
      return;
    }

    if (novoValor === valorAtual) {
      campoSpan.textContent = valorAtual;
      return;
    }

    try {
      // Verifica se já existe username
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("username", "==", novoValor.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Este SapoId já está em uso. Escolha outro.");
        return;
      }

      const userDocRef = doc(db, "usuarios", usuarioDocId);
      await updateDoc(userDocRef, {
        [campoValor]: novoValor.toLowerCase()
      });

      campoSpan.textContent = novoValor;
      alert("SapoId atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar username:", error);
      alert("Erro ao atualizar SapoId.");
    }
  };

  campoSpan.innerHTML += " ";
  campoSpan.appendChild(botaoSalvar);
};

  let currentMatchId = null;
    let unsubscribe = null;
    let uid = null;

let emblemasSelecionados = new Set();


// Observa alterações na autenticação do Firebase
onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    console.log("Usuário logado:", uid);
    displayTopTracks(uid);

    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documento = querySnapshot.docs[0];
        const data = documento.data();
        usuarioDocId = documento.id;

        // Preenche campos do perfil
        document.getElementById("perfilNome").textContent = data.nome;
        document.getElementById("perfilCidade").textContent = data.cidade;
        document.getElementById("perfilTelefone").textContent = data.telefone;
        document.getElementById("perfilIdade").textContent = data.idade;
        document.getElementById("perfilEmail").textContent = data.email;
        document.getElementById("perfilSobre").textContent = data.sobre || "";
        document.getElementById("perfilUsername").textContent = data.username || "";
        usernameGlobal = data.username;
        document.getElementById("pontosUsuario").textContent = `${data.pontos || 0} pts`;

        if (data.fotoPerfil) {
          document.getElementById("fotoPerfil").src = data.fotoPerfil;
        }

        // Processa Spotify code
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        if (code) {
          processSpotifyCode(code, uid)
            .finally(() => {
              window.history.replaceState({}, document.title, url.pathname);
            });
        }

        if (outroIdGlobal && outroIdGlobal !== uid) {
          const usuarios = [uid, outroIdGlobal].sort();
          const matchId = "match_" + usuarios[0] + "_" + usuarios[1];
          abrirChat(matchId, outroIdGlobal, usernameGlobal);
        }

        // Emblemas manuais
        const emblemasContainer = document.getElementById("emblemasContainer");
        emblemasContainer.innerHTML = "";
        emblemasSelecionados = new Set(data.emblemasPerfil || []);
        const contadorSelecionados = document.getElementById("contadorSelecionados");

        function atualizarContador() {
          contadorSelecionados.textContent = `${emblemasSelecionados.size}/4 selecionados`;
        }

        atualizarContador();

        if (data.emblemas && Array.isArray(data.emblemas)) {
          data.emblemas.forEach(emblema => {
  const img = document.createElement("img");
  img.src = emblema.imagemUrl;
  img.style.borderRadius = "50%";  img.style.border = emblemasSelecionados.has(emblema.imagemUrl)
    ? "3px solid #7e57c2"
    : "2px solid transparent";
  img.alt = emblema.descricao || "Emblema";
  img.title = emblema.descricao || "";
  img.classList.add("emblema");
  img.style.cursor = "pointer";
  

  img.dataset.url = emblema.imagemUrl;

  img.addEventListener("click", () => {
    const url = img.dataset.url;
    if (emblemasSelecionados.has(url)) {
      emblemasSelecionados.delete(url);
      img.style.border = "2px solid transparent";
    } else {
      if (emblemasSelecionados.size < 4) {
        emblemasSelecionados.add(url);
        img.style.border = "3px solid #7e57c2";
      } else {
        alert("Você só pode selecionar até 4 emblemas.");
      }
    }
    atualizarContador();
  });

  emblemasContainer.appendChild(img);
});



          document.getElementById("salvarEmblemasSelecionados").addEventListener("click", async () => {
            const userRef = doc(db, "usuarios", usuarioDocId);
            await updateDoc(userRef, {
              emblemasPerfil: Array.from(emblemasSelecionados)
            });
            alert("Emblemas salvos! Agora eles aparecem no seu perfil.");
          });
        }

        // Emblemas automáticos
        const emblemasAutomaticos = atribuirEmblemas(data);
        emblemasAutomaticos.forEach(async emblema => {
          try {
            const storageRef = ref(storage, `autoEmblems/${emblema.nome}`);
            const urlImg = await getDownloadURL(storageRef);
            const img = document.createElement("img");
            img.src = urlImg;
            img.alt = emblema.nome;
            img.title = emblema.descricao;
            img.classList.add("emblema");
            emblemasContainer.appendChild(img);
          } catch {
            console.warn(`Emblema automático não encontrado: ${emblema.nome}`);
          }
        });

        // Ativa edição de campos
        document.getElementById("editNome").onclick = () => editarCampo("perfilNome", "nome");
        document.getElementById("editCidade").onclick = () => editarCampo("perfilCidade", "cidade");
        document.getElementById("editTelefone").onclick = () => editarCampo("perfilTelefone", "telefone");
        document.getElementById("editIdade").onclick = () => editarCampo("perfilIdade", "idade");
        document.getElementById("editEmail").onclick = () => editarCampo("perfilEmail", "email");
        document.getElementById("editSobre").onclick = () => editarCampo("perfilSobre", "sobre");
        document.getElementById("editUsername").onclick = () => editarCampoUsername("perfilUsername", "username");

        // Foto de perfil
        document.getElementById("btnAlterarFoto").addEventListener("click", () => {
          document.getElementById("uploadFoto").click();
        });

        document.getElementById("uploadFoto").addEventListener("change", async (event) => {
          const file = event.target.files[0];
          if (file) {
            await uploadFotoPerfil(file, uid);
          }
        });

        // Mostra o perfil
        document.getElementById("perfilContainer").style.display = "block";

        // Status
        carregarStatusUsuario();
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  } else {
    console.log("Nenhum usuário logado");
  }
});


// Secrets

// Referências aos elementos
const btnSecrets = document.getElementById('btnSecrets');
const secretsContainer = document.getElementById('secretsContainer');
const enviarSegredoBtn = document.getElementById('enviarSegredo');
const secretsTextarea = document.getElementById('secrets');
const secretsTituloInput = document.getElementById('secretsTitulo'); // <- novo

// Função para abrir/fechar o form
btnSecrets.addEventListener('click', () => {
  if (secretsContainer.style.display === 'none') {
    secretsContainer.style.display = 'block';
  } else {
    secretsContainer.style.display = 'none';
    closeAllForms();
  }
});

// Função para enviar dados para Firestore
enviarSegredoBtn.addEventListener('click', async () => {
  const segredo = secretsTextarea.value.trim();
  const titulo = secretsTituloInput.value.trim(); // <- novo

  if (segredo.length === 0 || titulo.length === 0) {
    alert('Por favor, preencha o título e o segredo antes de enviar.');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'segredos'), {
      titulo: titulo,
      texto: segredo,
      criadoEm: new Date()
    });

    alert('Segredo enviado com sucesso!');

    // Limpar inputs e fechar o form
    secretsTextarea.value = '';
    secretsTituloInput.value = ''; // <- novo
    secretsContainer.style.display = 'none';

  } catch (error) {
    console.error("Erro ao enviar segredo: ", error);
    alert('Erro ao enviar segredo. Tente novamente.');
  }
});



// Chat

window.abrirChat = function (matchId, outroId, username) {
  const chatContainer = document.getElementById("chatContainer");

  // Alterna a exibição do chat
  if (chatContainer.style.display === "block") {
    chatContainer.style.display = "none";
    return;
  }

  currentMatchId = matchId;
  chatContainer.style.display = "block";
  document.getElementById("chatTitulo").innerText = `Conversando com ${username}`;
  document.getElementById("chatMensagens").innerHTML = "";

  escutarMensagens();
};

async function enviarMensagem() {
  const input = document.getElementById("mensagemInput");
  const texto = input.value.trim();
  if (!texto || !currentMatchId || !uid) return;

  const mensagem = {
    texto,
    remetente: uid,
    timestamp: serverTimestamp()
  };

  const mensagensRef = collection(db, "chats", currentMatchId, "mensagens");
  await addDoc(mensagensRef, mensagem);
  input.value = "";
}

document.getElementById("btnEnviar").addEventListener("click", enviarMensagem);

// Botão de ícone dispara input de imagem
document.getElementById("btnIconeImagem").addEventListener("click", () => {
  document.getElementById("imagemInput").click();
});

// Ao escolher uma imagem, envia automaticamente
document.getElementById("imagemInput").addEventListener("change", async () => {
  const fileInput = document.getElementById("imagemInput");
  const file = fileInput.files[0];
  if (!file || !currentMatchId || !uid) return;

  const storageRef = ref(storage, `chatImgs/${currentMatchId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  const mensagem = {
    imagem: imageUrl,
    remetente: uid,
    timestamp: serverTimestamp(),
    expiraEm: Date.now() + 60 * 1000 // 1 minuto
  };

  const mensagensRef = collection(db, "chats", currentMatchId, "mensagens");
  await addDoc(mensagensRef, mensagem);
  fileInput.value = "";
});

function escutarMensagens() {
  if (!currentMatchId || !uid) return;
  if (unsubscribe) unsubscribe();

  const mensagensRef = collection(db, "chats", currentMatchId, "mensagens");
  const mensagensQuery = query(mensagensRef, orderBy("timestamp"));

  unsubscribe = onSnapshot(mensagensQuery, (snapshot) => {
    const chat = document.getElementById("chatMensagens");
    chat.innerHTML = "";

    snapshot.forEach((doc) => {
      const msg = doc.data();
      const agora = Date.now();
      const expira = msg.expiraEm || Infinity;
      if (agora > expira) return;

      const wrapper = document.createElement("div");
    wrapper.className = msg.remetente === uid ? "d-flex justify-content-end mb-2" : "d-flex justify-content-start mb-2";
    
    const msgBox = document.createElement("div");
    msgBox.className = msg.remetente === uid
      ? "bg-primary text-white rounded px-3 py-2"
      : "bg-light text-dark rounded px-3 py-2";
    
    msgBox.style.maxWidth = "75%";
    msgBox.style.display = "inline-block";
    msgBox.style.wordBreak = "break-word";
    
    if (msg.imagem) {
      msgBox.innerHTML = `<img src="${msg.imagem}" style="max-width: 150px; border-radius: 8px;">`;
    } else {
      msgBox.textContent = msg.texto;
    }
    
    wrapper.appendChild(msgBox);
    chat.appendChild(wrapper);
    });

    chat.scrollTop = chat.scrollHeight;
  });
}

// Apenas uma vez, fora da função escutarMensagens
document.getElementById("btnEnviar").addEventListener("click", enviarMensagem);





// Depoimentos

document.addEventListener("DOMContentLoaded", async () => {
  const btnDepoimentos = document.getElementById("btnDepoimentos");
  const menuDepoimentos = document.getElementById("menuDepoimentos");
  const btnVer = document.getElementById("verDepoimentos");
  const btnEscrever = document.getElementById("escreverDepoimento");

  const form = document.getElementById("formDepoimentos");
  const selectDestino = document.getElementById("usuarioDestino");
  const listaDepoimentos = document.getElementById("listaDepoimentos");
  const containerDepoimentos = document.getElementById("depoimentosContainer");

  const campoBusca = document.createElement("input");
  campoBusca.className = "form-control mb-2";
  campoBusca.placeholder = "Buscar usuário...";
  selectDestino.parentElement.insertBefore(campoBusca, selectDestino);

  let usuariosCarregados = [];

  btnDepoimentos.addEventListener("click", () => {
    document.body.classList.add("bg-depoimentos");
    form.style.display = "none";
    listaDepoimentos.style.display = "none";
  });

  btnVer.addEventListener("click", async () => {
    document.body.classList.add("bg-depoimentos")
    form.style.display = "none";
    listaDepoimentos.style.display = "block";
    await mostrarDepoimentosDoUsuario();
  });

  btnEscrever.addEventListener("click", () => {
    document.body.classList.add("bg-depoimentos")
    form.style.display = "block";
    listaDepoimentos.style.display = "none";
  });

  async function carregarUsuarios() {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    usuariosCarregados = [];
    selectDestino.innerHTML = `<option selected disabled>Selecione um usuário</option>`;

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      usuariosCarregados.push({ id: docSnap.id, nome: data.nome || data.usuario || "Sem nome" });
    });

    atualizarSelect(usuariosCarregados);
  }

  function atualizarSelect(lista) {
    selectDestino.innerHTML = `<option selected disabled>Selecione um usuário</option>`;
    lista.forEach((usuario) => {
      const opt = document.createElement("option");
      opt.value = usuario.id;
      opt.textContent = usuario.nome;
      selectDestino.appendChild(opt);
    });
  }

  campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();
    const filtrados = usuariosCarregados.filter(u => u.nome.toLowerCase().includes(termo));
    atualizarSelect(filtrados);
  });

  await carregarUsuarios();
  
  // badgeDepoimentos
  
  async function verificarDepoimentosNovos() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  const temDepoimentos = (data.depoimentos || []).length > 0;
  document.getElementById("badgeDepoimentos").style.display = temDepoimentos ? "inline-block" : "none";
}

auth.onAuthStateChanged(() => {
  verificarDepoimentosNovos();
});

// Exclusão

async function excluirDepoimento(titulo, de, texto) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  const novosDepoimentos = (data.depoimentos || []).filter(dep =>
    dep.titulo !== titulo || dep.de !== de || dep.texto !== texto
  );

  await updateDoc(userRef, {
    depoimentos: novosDepoimentos
  });

  alert("Depoimento excluído!");
  mostrarDepoimentosDoUsuario(); // Atualiza a lista
}


  // Enviar depoimento
 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("tituloDepoimento").value.trim();
  const remetente = document.getElementById("usuarioDepoente").value.trim();
  const destinoId = selectDestino.value;
  const texto = document.getElementById("textoDepoimento").value.trim();

  if (!titulo || !remetente || !destinoId || !texto) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  try {
    const destinoRef = doc(db, "usuarios", destinoId);
    const destinoSnap = await getDoc(destinoRef);
    const destinoData = destinoSnap.data();

    // Incrementa o contador (padrão: 0)
    const novoContador = (destinoData.contadorDepoimentosRecebidos || 0) + 1;

    await updateDoc(destinoRef, {
      depoimentos: arrayUnion({
        titulo,
        de: remetente,
        texto,
        data: new Date().toISOString()
      }),
      contadorDepoimentosRecebidos: novoContador
    });

    // Conceder emblema se necessário
    await concederEmblemasProgresso(destinoId, "depoimento", novoContador);

    alert("Depoimento enviado com sucesso!");
    form.reset();
    form.style.display = "none";
  } catch (error) {
    console.error("Erro ao enviar depoimento:", error);
    alert("Erro ao enviar depoimento.");
  }
});


 async function mostrarDepoimentosDoUsuario() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para ver seus depoimentos.");
    return;
  }

  const userRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    containerDepoimentos.innerHTML = "<p>Usuário não encontrado.</p>";
    return;
  }

  const data = docSnap.data();
  const depoimentos = data.depoimentos || [];

  if (depoimentos.length === 0) {
    containerDepoimentos.innerHTML = '<p class="text-center">Você ainda não recebeu depoimentos.</p>';
    await verificarDepoimentosNovos();
    return;
  }

  containerDepoimentos.innerHTML = "";
  depoimentos.forEach(dep => {
    const div = document.createElement("div");
    div.className = "mb-3 border rounded p-2";
    div.innerHTML = `
      <h6 class="text-paragrafo">${dep.titulo}</h6>
      <small class="text-paragrafo"><strong>De:</strong> ${dep.de}</small>
      <p class="text-paragrafo">${dep.texto}</p>
    `;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn btn-sm btn-danger mt-2";
    botaoExcluir.innerHTML = '<i class="bi bi-trash"></i> Excluir';
    botaoExcluir.addEventListener("click", async () => {
      await excluirDepoimento(dep.titulo, dep.de, dep.texto);
    });

    div.appendChild(botaoExcluir);
    containerDepoimentos.appendChild(div);
  });

  await verificarDepoimentosNovos(); // Atualiza o badge após visualizar
}});


// Pegação

const selectUsuarios = document.getElementById("selectUsuarios");
const formTestarQuimica = document.getElementById("formTestarQuimica");
const btnTestarQuimica = document.getElementById("btnTestarQuimica");
const contadorDisponiveis = document.getElementById("contadorDisponiveis");
const statusUsuarioSelect = document.getElementById("statusUsuario");
const convitesContainer = document.getElementById("convitesContainer");

    const cardQuimica = document.getElementById('cardQuimica');

    if (btnTestarQuimica && cardQuimica) {
      btnTestarQuimica.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link, se houver
        cardQuimica.style.display = cardQuimica.style.display === 'none' ? 'block' : 'none';
      });
    }
  


async function atualizarContador(userId, tipo) {
  const userRef = doc(db, "usuarios", userId);
  const userSnap = await getDoc(userRef);

  // Se o documento do usuário ainda não existe, cria com o contador inicial
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      contadores: {
        [tipo]: 1
      }
    }, { merge: true });
    return;
  }

  // Se já existe, incrementa o campo desejado
  await updateDoc(userRef, {
    [`contadores.${tipo}`]: increment(1)
  });
}

async function carregarStatusUsuario() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const dados = userSnap.data();
    const status = dados.disponivelParaPegacao;

    if (status === true) {
      statusUsuarioSelect.value = "true";
    } else if (status === false) {
      statusUsuarioSelect.value = "false";
    } else {
      statusUsuarioSelect.selectedIndex = 0; // seleciona "Status"
    }
  }}


// Atualizar status de disponibilidade
statusUsuarioSelect.addEventListener("change", async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Usuário não autenticado.");
    return;
  }

  const userRef = doc(db, "usuarios", user.uid);
  const disponivel = statusUsuarioSelect.value === "true";

  try {
    await updateDoc(userRef, {
      disponivelParaPegacao: disponivel
    });

    alert(`Status atualizado para: ${disponivel ? "Disponível" : "Indisponível"}`);
    carregarUsuariosDisponiveis();
  } catch (error) {
    alert("Erro ao atualizar status.");
    console.error(error);
  }
});

// Mostrar ou ocultar o formulário


// Carregar usuários disponíveis
async function carregarUsuariosDisponiveis() {
    const usuariosContainer = document.getElementById('usuariosDisponiveisContainer');
    usuariosContainer.innerHTML = ''; // Limpa o conteúdo existente
    const contadorDisponiveis = document.getElementById('contadorDisponiveis'); // Garante que o elemento seja acessado

    try {
        const q = query(collection(db, "usuarios"), where("disponivelParaPegacao", "==", true));
        const querySnapshot = await getDocs(q);

        let contador = 0;

        for (const docSnap of querySnapshot.docs) {
            const userId = docSnap.id;
            const user = docSnap.data();
            const sobre = user.sobre || "Sem descrição";

            let fotoURL = "";
            try {
                fotoURL = await getDownloadURL(ref(storage, `fotosPerfil/${userId}.jpg`));
            } catch (e) {
                fotoURL = 'default.png';
            }

            const userCardHtml = `
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="card user-card h-100 text-center p-3" style="background-color: #E0F7FA; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <img src="${fotoURL}" alt="Foto de Perfil de ${user.username}" class="rounded-circle mx-auto mb-2" style="width: 80px; height: 80px; object-fit: cover;">
                            <h6 class="card-title mb-1" style="color: #5e35b1;">${user.username}</h6>
                            <p class="card-text text-muted" style="font-size: 0.9em;">${user.status || "Disponível"}</p>
                            <p class="card-text" style="font-size: 0.85em; color: #7e57c2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 3em;">${sobre}</p>
                        </div>
                        <div class="d-flex justify-content-around mt-auto">
                            <button type="button" class="btn btn-sm enviar-hop-btn"
                                    data-user-id="${userId}"
                                    data-user-name="${user.username}"
                                    data-user-foto="${fotoURL}"
                                    data-user-sobre="${sobre}"
                                    style="background-color: #8e2de2; color: #fff; flex-grow: 1; margin-right: 5px;">
                                <i class="bi bi-heart"></i> Hop!
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary ver-perfil-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#perfilModal"
                                    data-user-id="${userId}"
                                    data-user-name="${user.username}"
                                    data-user-foto="${fotoURL}"
                                    data-user-sobre="${sobre}"
                                    style="flex-grow: 1; margin-left: 5px;">
                                <i class="bi bi-person"></i> Ver Perfil
                            </button>
                        </div>
                    </div>
                </div>
            `;
            usuariosContainer.innerHTML += userCardHtml;
            contador++;
        }

        contadorDisponiveis.textContent = `🟢 ${contador} sapinhos online para dar um Hop!`;

        // Adiciona o event listener aqui
        usuariosContainer.addEventListener('click', async (event) => {
            console.log("Clique detectado no container de usuários.");

            let clickedButton = event.target.closest('.enviar-hop-btn');

            if (clickedButton) {
                console.log("Clique no botão 'Hop!' detectado.");

                const button = clickedButton;
                const toId = button.dataset.userId;
                const userName = button.dataset.userName;

                button.disabled = true;
                button.textContent = 'Enviando...';
                button.style.backgroundColor = '#ccc';

                try {
                    const currentUser = auth.currentUser;
                    if (!currentUser) {
                        alert("Você precisa estar logado para enviar um Hop!");
                        button.disabled = false;
                        button.textContent = 'Hop!';
                        button.style.backgroundColor = '#8e2de2';
                        return;
                    }

                    const fromId = currentUser.uid;
                    if (!toId || fromId === toId) {
                        alert("Não foi possível enviar o Hop. Selecione um sapinho válido.");
                        button.disabled = false;
                        button.textContent = 'Hop!';
                        button.style.backgroundColor = '#8e2de2';
                        return;
                    }

                    const q = query(
                        collection(db, "pegacoes"),
                        where("from", "==", toId),
                        where("to", "==", fromId)
                    );

                    const snapshot = await getDocs(q);
                    let match = false;

                    if (!snapshot.empty) {
                        match = true;
                        for (const docSnap of snapshot.docs) {
                            await updateDoc(doc(db, "pegacoes", docSnap.id), { match: true });
                        }

                        alert(`✨ Deu match com ${userName}!`);
                        button.textContent = 'Deu Match!';
                        button.style.backgroundColor = '#4CAF50';
                    } else {
                        await addDoc(collection(db, "pegacoes"), {
                            from: fromId,
                            to: toId,
                            timestamp: serverTimestamp(),
                            match: false,
                        });
                        alert(`Hop enviado para ${userName}!`);
                        button.textContent = 'Hop enviado!';
                        button.style.backgroundColor = '#673AB7';
                    }

                    await atualizarContador(fromId, "enviados");
                    await atualizarPegacaoStats(fromId, "enviados");

                    if (match) {
                        await atualizarContador(toId, "recebidos");
                        await atualizarPegacaoStats(toId, "recebidos");
                        await atualizarPegacaoStats(fromId, "matches");
                        await atualizarPegacaoStats(toId, "matches");
                    }

                    button.closest('.col-md-4').remove();

                } catch (error) {
                    console.error("Erro ao enviar hop:", error);
                    alert("Ocorreu um erro ao enviar o Hop. Por favor, tente novamente. Detalhes: " + error.message);
                    button.disabled = false;
                    button.textContent = 'Hop!';
                    button.style.backgroundColor = '#8e2de2';
                }

            } else if (event.target.classList.contains('ver-perfil-btn') || event.target.closest('.ver-perfil-btn')) {
                const button = event.target.closest('.ver-perfil-btn');
                if (!button) return;

                const userName = button.dataset.userName;
                const userFoto = button.dataset.userFoto;
                const userSobre = button.dataset.userSobre;

                const userCardElement = button.closest('.user-card');
                const userStatusElement = userCardElement ? userCardElement.querySelector('.card-text.text-muted') : null;
                const userStatus = userStatusElement ? userStatusElement.textContent : 'Disponível';

                document.getElementById('modalUserName').textContent = userName;
                document.getElementById('modalUserFoto').src = userFoto;
                document.getElementById('modalUserStatus').textContent = userStatus;
                document.getElementById('modalUserSobre').textContent = userSobre;

                const modalContainer = document.getElementById("modalUserEmblemas");
modalContainer.innerHTML = ""; // limpa anteriores

try {
  const perfilUserRef = doc(db, "usuarios", button.dataset.userId);
  const perfilSnap = await getDoc(perfilUserRef);
  const emblemasDoPerfil = perfilSnap.data().emblemasPerfil || [];

  for (const url of emblemasDoPerfil) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Emblema";
    img.className = "emblema";
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "50%";
    img.style.cursor = "pointer";
    img.style.border = emblemasSelecionados.has(url)
  ? "3px solid #7e57c2"
  : "2px solid transparent";

    img.style.margin = "4px";
    modalContainer.appendChild(img);
  }
} catch (err) {
  console.error("Erro ao carregar emblemas do perfil:", err);
}

            }
        });

    } catch (error) {
        console.error("Erro ao carregar usuários disponíveis:", error);
    }
} // <- ESTA É A CHAVE DE FECHAMENTO FALTANTE




// Enviar convite




let outroIdGlobal = null;
let usernameGlobal = null;


// Carregar convites

async function carregarConvites(tipo) {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  // Limpar o container antes de carregar os convites
  convitesContainer.innerHTML = "<p>Carregando...</p>";

  const filtro = tipo === "enviados" ? "from" : "to";
  const q = query(collection(db, "pegacoes"), where(filtro, "==", currentUser.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    convitesContainer.innerHTML = "<p>Nenhum convite encontrado.</p>";
    return;
  }

  convitesContainer.innerHTML = ""; // Limpar o container

  for (const docSnap of querySnapshot.docs) {
    const dados = docSnap.data();
    const outroId = tipo === "enviados" ? dados.to : dados.from;
    outroIdGlobal = outroId;
    const outroDoc = await getDoc(doc(db, "usuarios", outroId));
    const outroData = outroDoc.exists() ? outroDoc.data() : {};
    const outroNome = outroData.username || "Usuário";
    const fotoPerfil = outroData.fotoPerfil || "default.jpg";


    const div = document.createElement("div");
    div.className = "card p-3 mb-2";
    div.innerHTML = `
     <div class="d-flex align-items-center justify-content-between mb-2">
  <div class="d-flex align-items-center">
    <img src="${fotoPerfil}" alt="Foto de ${outroNome}" class="rounded-circle me-3" width="50" height="50">
    <p class="mb-0"><strong>${tipo === "enviados" ? "Para" : "De"}:</strong> ${outroNome}</p>
  </div>
  ${tipo === "recebidos" ? `
    <div>
      <button class="btn  btn-sm me-1" onclick="responderConvite('${docSnap.id}', true)">✅</button>
      <button class="btn btn-sm" onclick="responderConvite('${docSnap.id}', false)">❌</button>
    </div>
  ` : `
    <button class="btn btn-outline-danger btn-sm" onclick="deletarConvite('${docSnap.id}')">Cancelar</button>
  `}
</div>
${dados.match ? "<p class='text-success'>✨ Match!</p>" : ""}
    `;
    convitesContainer.appendChild(div);
  }
}

const matchesContainer = document.getElementById("matchesContainer");

document.getElementById("tab-usuarios").addEventListener("click", () => {
  carregarUsuariosDisponiveis();
});

document.getElementById("tab-enviados").addEventListener("click", () => {
  carregarConvites("enviados");
});

document.getElementById("tab-recebidos").addEventListener("click", () => {
  carregarConvites("recebidos");
});


document.getElementById("tab-matches").addEventListener("click", () => {
  carregarMatches();
});


async function carregarMatches() {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  matchesContainer.innerHTML = "<p>Carregando matches...</p>";
  const userId = currentUser.uid;

  try {
    const qFrom = query(collection(db, "pegacoes"), where("from", "==", userId), where("match", "==", true));
    const qTo = query(collection(db, "pegacoes"), where("to", "==", userId), where("match", "==", true));

    const [fromSnap, toSnap] = await Promise.all([getDocs(qFrom), getDocs(qTo)]);
    const allMatches = [...fromSnap.docs, ...toSnap.docs];

    matchesContainer.innerHTML = "";
    if (allMatches.length === 0) {
      matchesContainer.innerHTML = "<p>Você ainda não deu match com ninguém. 😢</p>";
      return;
    }

    const matchSet = new Set();

    for (const docSnap of allMatches) {
      const dados = docSnap.data();
      const matchId = docSnap.id;
      const outroId = dados.from === userId ? dados.to : dados.from;

      // Cria uma chave única ordenada
      const key = [userId, outroId].sort().join("_");
      if (matchSet.has(key)) continue; // já exibido
      matchSet.add(key);

      const outroDoc = await getDoc(doc(db, "usuarios", outroId));
      if (!outroDoc.exists()) continue;

      const { username, telefone, fotoPerfil } = outroDoc.data();

      const div = document.createElement("div");
      div.className = "card p-3 mb-2";
      div.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center">
            <img src="${fotoPerfil || 'default.jpg'}" alt="Foto de ${username}" class="rounded-circle me-3" width="80" height="80">
            <div>
              <p class="mb-1"><strong>${username}</strong></p>
              <p class="mb-0"><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
            </div>
          </div>
          <div>
            <button class="btn btn-sm btn-success me-2" onclick="abrirChat('${matchId}', '${outroId}', '${username}')">💬 Conversar</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deletarMatch('${matchId}')">❌ Remover match</button>
          </div>
        </div>
      `;
      matchesContainer.appendChild(div);
    }

  } catch (error) {
    console.error("Erro ao carregar matches:", error);
    matchesContainer.innerHTML = "<p>Erro ao carregar matches. Veja o console.</p>";
  }
}


window.excluirMatch = async function (matchId) {
  await deleteDoc(doc(db, "pegacoes", matchId));
  alert("Match excluído.");
  carregarMatches();
};


// ✅ Tornar funções acessíveis globalmente
window.responderConvite = async function (id, aceito) {
  if (aceito) {
    await updateDoc(doc(db, "pegacoes", id), { match: true });

    // Criar reciprocidade se quiser
    const dados = (await getDoc(doc(db, "pegacoes", id))).data();
    await addDoc(collection(db, "pegacoes"), {
      from: dados.to,
      to: dados.from,
      timestamp: serverTimestamp(),
      match: true
    });

    alert("Convite aceito! ❤️");
  } else {
    await deleteDoc(doc(db, "pegacoes", id));
    alert("Convite recusado!");
  }

  carregarConvites("recebidos"); // Atualiza a lista após a resposta
};

window.deletarConvite = async function (id) {
  await deleteDoc(doc(db, "pegacoes", id));
  alert("Convite cancelado.");
  carregarConvites("enviados");
};

// Chamar ao carregar a página
carregarUsuariosDisponiveis();

async function verificarEmblemas(userId, tipo, total) {
  const emblemasRef = collection(db, "usuarios", userId, "emblemas");
  const tipos = {
    enviados: "pegacao",
    recebidos: "pegacaoRecebidos",
    matches: "pegacaoMatch"
  };

  const tipoBase = tipos[tipo];
  const marcos = [1, 5, 20];

  for (const marco of marcos) {
    const id = `${tipoBase}${marco}`;
    const docRef = doc(emblemasRef, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() && total >= marco) {
      await setDoc(docRef, {
        nome: id,
        data: serverTimestamp(),
        imagem: `${tipoBase}${marco}.jpg`
      });
    }
  }
}

async function atualizarPegacaoStats(uid, tipo) {
  const userRef = doc(db, "usuarios", uid);
  const userSnap = await getDoc(userRef);
  let stats = {};

  if (userSnap.exists()) {
    stats = userSnap.data().pegacaoStats || {
      enviados: 0,
      recebidos: 0,
      matches: 0
    };

    stats[tipo] = (stats[tipo] || 0) + 1;

    await updateDoc(userRef, { pegacaoStats: stats });

    // Verifica e concede emblemas
    const marco = stats[tipo];
    if ([1, 5, 20].includes(marco)) {
      const emblemaRef = doc(db, "usuarios", uid, "emblemas", "pegacao" + marco);
      const emblemaSnap = await getDoc(emblemaRef);
      if (!emblemaSnap.exists()) {
        await setDoc(emblemaRef, {
          tipo: "pegacao",
          nome: `Pegação ${marco}`,
          imagem: `pegacao${marco}.jpg`,
          data: serverTimestamp()
        });
      }
    }
  }
}






const painelUsuario = document.querySelector(".painel-usuario");
document.addEventListener("DOMContentLoaded", () => {
  const formCorreioElegante = document.getElementById("formCorreioElegante");
  const formBug = document.getElementById("formBug");
  const formTemplate = document.getElementById("formTemplate");
  const formConfirmarPresenca = document.getElementById("formConfirmarPresenca");
  const perfilContainer = document.getElementById("perfilContainer");
  const formTestarQuimica = document.getElementById("formTestarQuimica");

  function closeAllForms() {
    if (formCorreioElegante) formCorreioElegante.style.display = "none";
    if (formBug) formBug.style.display = "none";
    if (formTemplate) formTemplate.style.display = "none";
    if (formConfirmarPresenca) formConfirmarPresenca.style.display = "none";
    if (perfilContainer) perfilContainer.style.display = "none";

    const menuDepoimentos = document.getElementById("menuDepoimentos");
    const formDepoimentos = document.getElementById("formDepoimentos");
    const listaDepoimentos = document.getElementById("listaDepoimentos");
    const containerDepoimentos = document.getElementById("depoimentosContainer");
    
    const abaAtiva = document.querySelector('#conteudoAbas .tab-pane.active');
if (abaAtiva && abaAtiva.id === "tabUsuarios") {
  carregarUsuariosDisponiveis(); // recarrega os usuários disponíveis se estiver na aba correta
}

    if (formDepoimentos) formDepoimentos.style.display = "none";
    if (menuDepoimentos) menuDepoimentos.style.display = "none";
    if (listaDepoimentos) listaDepoimentos.style.display = "none";
    if (containerDepoimentos) containerDepoimentos.innerHTML = "";

    document.body.classList.remove(
      "bg-correio-elegante",
      "bg-relatar-bug",
      "bg-criar-template",
      "bg-confirmar-presenca",
      "bg-editar-perfil",
      "bg-emblemas",
      "bg-depoimentos",
      "bg-testar-quimica"
    );
  }

  document.getElementById("btnEnviarCorreioElegante").addEventListener("click", function () {
    const isVisible = formCorreioElegante.style.display === "block";
    closeAllForms();
    document.body.classList.add("bg-correio-elegante");
    formCorreioElegante.style.display = isVisible ? "none" : "block";
  });

  document.getElementById("relatarBugBtn").addEventListener("click", function () {
    const isVisible = formBug.style.display === "block";
    closeAllForms();
    document.body.classList.add("bg-relatar-bug");
    formBug.style.display = isVisible ? "none" : "block";
  });

  document.getElementById("btnCriarTemplate").addEventListener("click", function () {
    const isVisible = formTemplate.style.display === "block";
    closeAllForms();
    document.body.classList.add("bg-criar-template");
    formTemplate.style.display = isVisible ? "none" : "block";
  });

  const btnConfirmarPresenca = document.getElementById("btnConfirmarPresenca");
  if (btnConfirmarPresenca) {
    btnConfirmarPresenca.addEventListener("click", function () {
      const isVisible = formConfirmarPresenca.style.display === "block";
      closeAllForms();
      document.body.classList.add("bg-confirmar-presenca");
      formConfirmarPresenca.style.display = isVisible ? "none" : "block";
    });
  }

  const btnVerPerfil = document.getElementById("btnVerPerfil");
  if (btnVerPerfil) {
    btnVerPerfil.addEventListener("click", function () {
      const isVisible = perfilContainer.style.display === "block";
      closeAllForms();
      perfilContainer.style.display = isVisible ? "none" : "block";
      document.body.classList.add("bg-editar-perfil");
    });
  }

  const btnEmblemas = document.getElementById("btnEmblemas");
    if (btnEmblemas) {
    btnEmblemas.addEventListener("click", function () {
    const emblemasSection = document.getElementById("emblemasSection");

    const isHidden = emblemasSection.style.display === "none" || emblemasSection.style.display === "";

    if (isHidden) {
      emblemasSection.style.display = "block";
      document.body.classList.add("bg-emblemas");
      closeAllForms();
    } else {
      emblemasSection.style.display = "none";
      document.body.classList.remove("bg-emblemas");
    }
  });
}


});


function atribuirEmblemas(user) {
  const emblemas = [];
  const descricoesEmblemas = {
    "emblemaVeterano.jpg": "Recebeu o emblema de veterano por alcançar 50 pontos.",
    "emblemaExplorador.jpg": "Recebeu o emblema de explorador por alcançar 30 pontos.",
    "emblemaIniciante.jpg": "Recebeu o emblema de iniciante por alcançar 10 pontos."
  };

  if (user.pontos >= 50) {
    emblemas.push({ nome: 'emblemaVeterano.jpg', descricao: descricoesEmblemas["emblemaVeterano.jpg"] });
  }
  if (user.pontos >= 30) {
    emblemas.push({ nome: 'emblemaExplorador.jpg', descricao: descricoesEmblemas["emblemaExplorador.jpg"] });
  }
  if (user.pontos >= 10) {
    emblemas.push({ nome: 'emblemaIniciante.jpg', descricao: descricoesEmblemas["emblemaIniciante.jpg"] });
  }

  return emblemas;
}


async function concederEmblemaUnico(userId, userData, tipo) {
  const jaTem = userData.emblemasUnicosRecebidos?.includes(tipo);
  if (jaTem) return;

  const emblemasInfo = {
    bug: {
      descricao: "Relatou um bug",
      arquivo: "bug.jpg"
    },
    correio: {
      descricao: "Enviou um correio elegante",
      arquivo: "correio.jpg"
    },
    template: {
      descricao: "Criou um template",
      arquivo: "template.jpg"
    }
  };

  const info = emblemasInfo[tipo];
  if (!info) return;

  try {
    const storageRef = ref(storage, `autoEmblems/${info.arquivo}`);
    const imagemUrl = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "usuarios", userId), {
      emblemas: arrayUnion({
        descricao: info.descricao,
        imagemUrl: imagemUrl
      }),
      emblemasUnicosRecebidos: arrayUnion(tipo)
    });

    alert(`Você recebeu o emblema: ${info.descricao}`);
  } catch (error) {
    console.error("Erro ao conceder emblema único:", error);
  }
}

async function concederEmblemasProgresso(userId, tipo, novaContagem) {
  const emblemasPorTipo = {
    depoimento: {
      1: "depoimento1.jpeg",
      5: "depoimento5.jpeg",
      20: "depoimento20.jpeg"
    },
    pegacaoEnviada: {
      1: "pegacao1env.jpeg",
      5: "pegacao5env.jpeg",
      20: "pegacao20env.jpeg"
    },
    pegacaoRecebida: {
      1: "pegacao1rec.jpeg",
      5: "pegacao5rec.jpeg",
      20: "pegacao20rec.jpeg"
    },
    match: {
      1: "match1.jpeg",
      5: "match5.jpeg",
      20: "match20.jpeg"
    }
  };

  const emblemas = emblemasPorTipo[tipo];
  if (!emblemas || !emblemas[novaContagem]) return;

  const imagemNome = emblemas[novaContagem];
  const storageRef = ref(storage, `autoEmblems/${imagemNome}`);
  const imagemUrl = await getDownloadURL(storageRef);

  const userRef = doc(db, "usuarios", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  const jaRecebido = userData?.emblemasRecebidosProgresso?.includes(imagemNome);
  if (jaRecebido) return;

  await updateDoc(userRef, {
    emblemas: arrayUnion({
      descricao: `Recebeu emblema por ${tipo} ${novaContagem}x.`,
      imagemUrl: imagemUrl
    }),
    emblemasRecebidosProgresso: arrayUnion(imagemNome)
  });

  alert(`Você recebeu um novo emblema por ${tipo} ${novaContagem}x!`);
}




document.getElementById("correioForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const destinatario = document.getElementById("destinatario").value;
  const remetente = document.getElementById("remetente").value;
  const mensagem = document.getElementById("mensagem").value;

  try {
    await addDoc(collection(db, "correioElegante"), {
      destinatario,
      remetente,
      mensagem,
      timestamp: serverTimestamp(),
    });

    document.getElementById("correioStatus").style.display = "block";
    document.getElementById("correioForm").reset();

    const userId = auth.currentUser.uid;
    const userSnap = await getDoc(doc(db, "usuarios", userId));
    const userData = userSnap.data();
    await concederEmblemaUnico(userId, userData, "correio");
  } catch (error) {
    console.error("Erro ao enviar correio elegante", error);
  }
});

document.getElementById("bugForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  try {
    await addDoc(collection(db, "bugs"), {
      titulo,
      descricao,
      timestamp: serverTimestamp(),
    });

    document.getElementById("bugStatus").style.display = "block";
    document.getElementById("bugForm").reset();

    const userId = auth.currentUser.uid;
    const userSnap = await getDoc(doc(db, "usuarios", userId));
    const userData = userSnap.data();
    await concederEmblemaUnico(userId, userData, "bug");
  } catch (error) {
    console.error("Erro ao relatar bug", error);
  }
});


async function getImageAsBase64(storagePath) {
  const url = await getDownloadURL(ref(storage, storagePath));
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

document.getElementById("gerarTemplate").addEventListener("click", async function () {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const aniversario = document.getElementById("aniversario").value;
  const signo = document.getElementById("signo").value;
  const altura = document.getElementById("altura").value;
  const cidadeBairro = document.getElementById("cidadeBairro").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const hobbies = document.getElementById("hobbies").value;
  const instagram = document.getElementById("instagram").value;

  const conteudo = `
OLÁ MENINOS, TUDO BOM?!

NOVATOS SEJAM BEM VINDOS 🩵

Pedimos a todos que se apresente com foto, e que sigam as regras do grupo (importante ter a foto do perfil aberta a todos) ❤

😇 NOME: ${nome}
⏳ IDADE: ${idade}
🥳 ANIVERSÁRIO: ${aniversario}
❤ SIGNO: ${signo}
⬆ ALTURA: ${altura}
📬 CIDADE E BAIRRO SP: ${cidadeBairro}
❤ ESTADO CIVIL: ${estadoCivil}
🎮 HOBBIES: ${hobbies}
📸 INSTA: ${instagram}
`;

  const resultadoTemplate = document.getElementById("resultadoTemplate");
  resultadoTemplate.textContent = conteudo;
  resultadoTemplate.style.display = "block";

  document.getElementById("formTemplate").style.display = "none";
  document.getElementById("copiarTexto").style.display = "inline-block";

  if (typeof db !== "undefined") {
    try {
      await addDoc(collection(db, "templates"), {
        nome,
        idade,
        aniversario,
        signo,
        altura,
        cidadeBairro,
        estadoCivil,
        hobbies,
        instagram,
        timestamp: serverTimestamp(),
      });

      const userId = auth.currentUser.uid;
      const userSnap = await getDoc(doc(db, "usuarios", userId));
      const userData = userSnap.data();
      await concederEmblemaUnico(userId, userData, "template");
    } catch (error) {
      console.error("Erro ao criar template", error);
    }
  }

  document.getElementById("templateForm").reset();
});


document.getElementById("copiarTexto").addEventListener("click", function () {
  const texto = document.getElementById("resultadoTemplate").textContent;
  navigator.clipboard.writeText(texto)
    .then(() => alert("Texto copiado com sucesso!"))
    .catch(() => alert("Erro ao copiar o texto."));
});


  // Confirmar Presença
  getDocs(collection(db, "roles"))
  .then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const roleDoc = querySnapshot.docs[0];
      const roleData = roleDoc.data();

      document.getElementById("nomeRole").textContent = roleData.nomeRole;
      document.getElementById("dataRole").textContent = roleData.dataRole;

      const container = document.getElementById("formConfirmarPresenca");
      container.dataset.nomeRole = roleData.nomeRole;
      container.dataset.dataRole = roleData.dataRole;
      container.dataset.idRole = roleDoc.id;
    }
  })
  .catch((error) => {
    console.error("Erro ao buscar rolê:", error);
  });

// Evento botão "Vou"
document.getElementById("btnVou").addEventListener("click", async () => {
  const container = document.getElementById("formConfirmarPresenca");
  const idRole = container.dataset.idRole;

  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para confirmar presença.");
    return;
  }

  try {
    // Busca dados do usuário logado na coleção 'usuarios'
    const q = query(collection(db, "usuarios"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Dados do usuário não encontrados.");
      return;
    }

    const userData = querySnapshot.docs[0].data();

    await addDoc(collection(db, "pessoas"), {
      nome: userData.nome || "sem nome",
      cidade: userData.cidade || "sem cidade",
      idRole: idRole
    });

    document.getElementById("presencaStatus").style.display = "block";
  } catch (error) {
    console.error("Erro ao confirmar presença", error);
    alert("Erro ao confirmar presença. Tente novamente.");
  }
});

// Evento botão "Não vou"
document.getElementById("btnNaoVou").addEventListener("click", () => {
    document.getElementById("presencaStatusNao").style.display = "block";
});


const forms = [formCorreioElegante, formBug, formTemplate, formConfirmarPresenca,];

forms.forEach(form => {
  form.addEventListener("transitionend", function () {
    painelUsuario.classList.remove("bg-correio-elegante", "bg-relatar-bug", "bg-criar-template", "bg-confirmar-presenca", "bg-editar-perfil", "bg-emblemas", "bg-testar-quimica", "bg-depoimentos"
    );
    painelUsuario.classList.add("painel-usuario-bg")
  });
});

const botoes = [
  { id: 'btnEnviarCorreioElegante', classe: 'bg-correio-elegante' },
  { id: 'relatarBugBtn', classe: 'bg-relatar-bug' },
  { id: 'btnConfirmarPresenca', classe: 'bg-confirmar-presenca' },
  { id: 'btnCriarTemplate', classe: 'bg-criar-template' },
  { id: 'btnVer', classe: 'bg-depoimentos'},
  { id: 'btnEscrever', classe: 'bg-depoimentos'},
  { id: 'btnDepoimentos', classe: 'bg-depoimentos'},
  { id: 'btnTestarQuimica', classe: 'bg-testar-quimica'},
  { id: 'verRecebidos', classe: 'bg-testar-quimica'},
  { id: 'verEnviados', classe: 'bg-testar-quimica'},
  { id: 'btnEmblemas', classe: 'bg-emblemas'}
];

// Container do painel

// Lógica para limpar classes e aplicar a nova
botoes.forEach(botao => {
  const elemento = document.getElementById(botao.id);
  if (elemento) {
    elemento.addEventListener('click', () => {
      painelUsuario.classList.remove(
        'bg-correio-elegante',
        'bg-relatar-bug',
        'bg-confirmar-presenca',
        'bg-criar-template',
        'bg-editar-perfil',
        'bg-emblemas',
        'bg-depoimentos',
        'bg-testar-quimica'
      );
      painelUsuario.classList.add(botao.classe);
    });
  }
});