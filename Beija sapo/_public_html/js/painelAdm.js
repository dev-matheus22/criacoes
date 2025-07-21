 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
    import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    orderBy,
    query,
    limit,
    addDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    where,
    onSnapshot,
    arrayUnion,
    increment
  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  
    import {
        getStorage,
        ref,
        uploadBytes,
        getDownloadURL
    } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

  import {
    getAuth,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

  // Seu código aqui
  const firebaseConfig = {
    apiKey: "AIzaSyDkMTTM5yJbyIzjCl3vovJXx1dlNEX2IpU",
    authDomain: "beija-sapo.firebaseapp.com",
    projectId: "beija-sapo",
    storageBucket: "beija-sapo.firebasestorage.app",
    messagingSenderId: "429297677162",
    appId: "1:429297677162:web:3792b9546b7b44a16e6b13"
  };
  

  
        let editando = false;
        let idDoRoleAtual = null;
        let ultimoRole = null;
        let ultimoDoc = null;

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuário logado:", user.email);
    } else {
      window.location.href = "loginAdm.html";
    }
  });
  
  document.getElementById("botaoVoltar").addEventListener("click", async () => {
  try {
    // Desconectar o usuário
    await signOut(auth);
    console.log("Usuário desconectado");
    
    // Redirecionar para a página de login
    window.location.href = "loginAdm.html";
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
});
      
        async function fetchLastRole() {
          try {
            const q = query(collection(db, "roles"), orderBy("dataRole", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            const titulo = document.getElementById("roleTitulo");
      
            if (!querySnapshot.empty) {
              const docSnap = querySnapshot.docs[0];
              ultimoRole = docSnap.data();
              ultimoDoc = docSnap;
      
              const nome = ultimoRole.nomeRole || "Rolê sem nome";
              const data = ultimoRole.dataRole || "sem data";
              const hora = ultimoRole.horaRole || "sem horário";
              const endereco = ultimoRole.enderecoRole || "sem endereço";
      
              titulo.textContent = `Último rolê: ${nome} - ${data} às ${hora} @ ${endereco}`;
            } else {
              titulo.textContent = "Nenhum rolê encontrado.";
            }
          } catch (error) {
            console.error("Erro ao buscar o último rolê:", error);
            document.getElementById("roleTitulo").textContent = "Erro ao carregar rolê.";
          }
        }
      
        fetchLastRole();
      
        const formContainer = document.getElementById("formContainer");
      
        document.getElementById("novoRoleForm").addEventListener("submit", async (e) => {
          e.preventDefault();
      
          const nome = document.getElementById("nomeRole").value;
          const data = document.getElementById("dataRole").value;
          const horario = document.getElementById("horaRole").value;
          const endereco = document.getElementById("enderecoRole").value;
      
          const dadosRole = {
            nomeRole: nome,
            dataRole: data,
            horaRole: horario,
            enderecoRole: endereco
          };
      
          try {
            if (editando && idDoRoleAtual) {
              const roleRef = doc(db, "roles", idDoRoleAtual);
              await updateDoc(roleRef, dadosRole);
              alert("Rolê atualizado com sucesso!");
            } else {
              await addDoc(collection(db, "roles"), dadosRole);
              alert("Rolê criado com sucesso!");
            }
      
            document.getElementById("novoRoleForm").reset();
            formContainer.style.display = "none";
            document.querySelector("#novoRoleForm button[type='submit']").textContent = "Criar Rolê";
            editando = false;
            idDoRoleAtual = null;
      
            await fetchLastRole(); 
          } catch (err) {
            alert("Erro ao salvar rolê: " + err.message);
          }
        });
      
        document.getElementById("btnMarcarRole").addEventListener("click", () => {
          const isVisible = formContainer.style.display === "block";
          formContainer.style.display = isVisible ? "none" : "block";
        });
      
        document.getElementById("botaoEditarRole").addEventListener("click", () => {
          if (ultimoDoc) {
            const dados = ultimoDoc.data();
      
            document.getElementById("nomeRole").value = dados.nomeRole || "";
            document.getElementById("dataRole").value = dados.dataRole || "";
            document.getElementById("horaRole").value = dados.horaRole || "";
            document.getElementById("enderecoRole").value = dados.enderecoRole || "";
      
            formContainer.style.display = "block";
            document.querySelector("#novoRoleForm button[type='submit']").textContent = "Salvar Alterações";
      
            editando = true;
            idDoRoleAtual = ultimoDoc.id;
          } else {
            alert("Nenhum rolê cadastrado ainda!");
          }
        });


        document.getElementById("botaoExcluirRole").addEventListener("click", async () => {
          if (!ultimoDoc) {
            alert("Nenhum rolê encontrado para excluir.");
            return;
          }
          const confirmar = confirm("Tem certeza que deseja excluir o último rolê?");
          if (!confirmar) return;

          try {
            // 1. Excluir todas as pessoas relacionadas a esse rolê
            const pessoasRef = collection(db, "pessoas");
            const pessoasQuery = query(pessoasRef, where("idRole", "==", ultimoDoc.id));
            const pessoasSnapshot = await getDocs(pessoasQuery);

            const promises = pessoasSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(promises);

            // 2. Excluir o rolê
            await deleteDoc(doc(db, "roles", ultimoDoc.id));

            alert("Rolê e lista de presença excluídos com sucesso!");

            // 3. Reset
            ultimoDoc = null;
            ultimoRole = null;
            idDoRoleAtual = null;
            editando = false;

            document.getElementById("formContainer").style.display = "none";
            await fetchLastRole();

          } catch (error) {
            alert("Erro ao excluir rolê: " + error.message);
          }
        });

        // Brindes

        const formBrindes = document.getElementById("formBrindes");
        const painelBotoes = document.getElementById("painelBotoes");
        const formBrindesContainer = document.getElementById("formBrindesContainer");
        const trocasContainer = document.getElementById("trocasContainer");
        const botaoBrindes = document.getElementById("botaoBrindes");
        

        let painelBrindesAberto = false;

        formBrindes.addEventListener("submit", async (e) => {
          e.preventDefault();

          const nome = document.getElementById("nomeBrinde").value.trim();
          const descricao = document.getElementById("descricaoBrinde").value.trim();
          const valor = parseInt(document.getElementById("valorBrinde").value);
          const imagem = document.getElementById("imagemBrinde").files[0];
          const estoqueDisponivel = document.getElementById("estoqueDisponivel").checked;


          if (!nome || !descricao || isNaN(valor) || !imagem) {
            alert("Preencha todos os campos e selecione uma imagem.");
            return;
          }

          try {
            const storageRef = ref(storage, `brindes/${imagem.name}`);
            await uploadBytes(storageRef, imagem);
            const imagemUrl = await getDownloadURL(storageRef);

            await addDoc(collection(db, "brindes"), {
              nome,
              descricao,
              custo: valor,
              imagemUrl,
              estoqueDisponivel,
              criadoEm: new Date()
            });

            alert("Brinde cadastrado com sucesso!");
            formBrindes.reset();
          } catch (error) {
            console.error("Erro ao cadastrar brinde:", error);
            alert("Erro ao cadastrar brinde.");
          }
        });

        // Botão único que abre ou fecha os painéis de brindes
        botaoBrindes.addEventListener("click", async () => {
          if (!painelBrindesAberto) {
            painelBotoes.style.display = "none";
            formBrindesContainer.style.display = "block";
            trocasContainer.style.display = "block";
            await carregarTrocasPendentes();
            painelBrindesAberto = true;
          } else {
            formBrindesContainer.style.display = "none";
            trocasContainer.style.display = "none";
            painelBotoes.style.display = "flex";
            painelBrindesAberto = false;
          }
        });

        // Botão "Voltar" das trocas (caso ainda queira usar separadamente)
        document.getElementById("btnVoltarDasTrocas").addEventListener("click", () => {
          trocasContainer.style.display = "none";
          formBrindesContainer.style.display = "none";
          painelBotoes.style.display = "flex";
          painelBrindesAberto = false;
        });

        // Carrega a lista de trocas
        async function carregarTrocasPendentes() {
          const lista = document.getElementById("listaTrocas");
          lista.innerHTML = "";

          const q = query(collection(db, "trocas"), where("status", "==", "pendente"));
          const snapshot = await getDocs(q);

          if (snapshot.empty) {
            lista.innerHTML = "<li class='list-group-item'>Nenhum pedido pendente.</li>";
            return;
          }

          for (const docSnap of snapshot.docs) {
            const dados = docSnap.data();

            const userRef = doc(db, "usuarios", dados.idUsuario);
            const userSnap = await getDoc(userRef);
            const nomeUsuario = userSnap.exists() ? userSnap.data().nome : "Desconhecido";

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            li.innerHTML = `
              <div>
                <strong>${nomeUsuario}</strong> pediu: <span class="text-primary">${dados.nomeBrinde}</span>
              </div>
              <button class="btn btn-sm btn-outline-success">✔️ Entregue</button>
            `;

            li.querySelector("button").addEventListener("click", async () => {
              try {
                await updateDoc(doc(db, "trocas", docSnap.id), { status: "entregue" });
                li.remove();
              } catch (err) {
                alert("Erro ao marcar como entregue.");
                console.error(err);
              }
            });

            lista.appendChild(li);
          }
        };


        
        // Emblemas
        
         const botaoDarEmblemas = document.getElementById("botaoDarEmblemas");
        const botaoVoltarEmblemas = document.getElementById("botaoVoltarEmblemas");
        const formContainerEmblemas = document.getElementById("formContainerEmblemas");
        const atribuirEmblemaForm = document.getElementById("atribuirEmblemaForm");
        const usuariosEmblemaSelect = document.getElementById("usuariosEmblema");
        const imagemEmblemaInput = document.getElementById("imagemEmblema");
        const buscaUsuariosInput = document.getElementById("buscaUsuarios");
    
        let usuarios = []; // Armazenar os usuários globalmente
    
        // Mostrar o formulário de atribuição de emblema
        botaoDarEmblemas.addEventListener("click", function() {
            formContainerEmblemas.style.display = "block";
            carregarUsuarios();  // Função que carrega os usuários no select
        });
    
        // Voltar ao menu anterior
        botaoVoltarEmblemas?.addEventListener("click", function() {
            formContainerEmblemas.style.display = "none";
        });
    
        // Função para carregar os usuários no select
        async function carregarUsuarios() {
            try {
                const snapshot = await getDocs(collection(db, "usuarios"));
                usuarios = []; // Limpar o array de usuários antes de adicionar os novos
                snapshot.forEach(doc => {
                    const user = doc.data();
                    usuarios.push({ id: doc.id, nome: user.nome, username: user.username });
                });
    
                // Carregar no select
                usuariosEmblemaSelect.innerHTML = "";  // Limpa o select
                usuarios.forEach(user => {
                    const option = document.createElement("option");
                    option.value = user.id;
                    option.textContent = `${user.nome} (${user.username})`;
                    usuariosEmblemaSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }
    
        // Função para filtrar usuários pelo nome ou username
        buscaUsuariosInput.addEventListener("input", function() {
            const termoBusca = buscaUsuariosInput.value.toLowerCase();
            const opcoes = usuariosEmblemaSelect.querySelectorAll("option");
    
            opcoes.forEach(option => {
                const nome = option.textContent.toLowerCase();
                if (nome.includes(termoBusca)) {
                    option.style.display = "";
                } else {
                    option.style.display = "none";
                }
            });
        });
    
        // Função para lidar com o envio do formulário
       atribuirEmblemaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const descricaoEmblema = document.getElementById("descricaoEmblema").value;
        const usuariosSelecionados = Array.from(usuariosEmblemaSelect.selectedOptions).map(option => option.value);
        const pontosEmblema = parseInt(document.getElementById("pontosEmblema").value);
        const imagemFile = imagemEmblemaInput.files[0];

        if (!imagemFile || isNaN(pontosEmblema)) {
            alert("Por favor, selecione uma imagem e informe os pontos.");
            return;
        }

        const imagemRef = ref(storage, "emblemas/" + imagemFile.name);

        uploadBytes(imagemRef, imagemFile).then(() => {
            getDownloadURL(imagemRef).then(async (url) => {
                for (const userId of usuariosSelecionados) {
                    const userRef = doc(db, "usuarios", userId);
                    await updateDoc(userRef, {
                        emblemas: arrayUnion({
                            descricao: descricaoEmblema,
                            imagemUrl: url
                        }),
                        pontos: increment(pontosEmblema)
                    });
                }

                alert("Emblema e pontos atribuídos com sucesso!");
                formContainerEmblemas.style.display = "none";
            });
        });
    });

        const cadastrarForm = document.getElementById("cadastrarForm");
        const formCadastrarRole = document.getElementById('cadastrarRolesContainer');
        const botaoCadastrarRole = document.getElementById('botaoCadastrarRole');
        const listaEventos = document.getElementById('listaEventos');
        
        botaoCadastrarRole.addEventListener('click', () => {
          const isVisible = cadastrarForm.style.display === 'block';
          cadastrarForm.style.display = isVisible ? 'none' : 'block';
        });
        
        formCadastrarRole.addEventListener('submit', async (e) => {
          e.preventDefault();
          const descricao = document.getElementById('descricaoEvento').value;
        
          if (descricao.trim() !== '') {
            const docRef = await addDoc(collection(db, 'eventosMes'), { descricao });
            formCadastrarRole.reset();
            alert('Evento cadastrado com sucesso!');
            cadastrarForm.style.display = 'none'; // Corrigido aqui
            botaoCadastrarRole.textContent = 'Cadastrar Novo Evento';
            adicionarEventoNaLista(docRef.id, descricao); // Adiciona o evento visualmente
          }
        });
        
        function adicionarEventoNaLista(id, descricao) {
          const linha = document.createElement('div');
          linha.className = 'text-center unstyled';
          linha.setAttribute('data-id', id);
        
          linha.innerHTML = `
            <span>${descricao}</span>
            <button class="btn btn-sm btn-outline-success">✔️</button>
          `;
        
          linha.querySelector('button').addEventListener('click', async () => {
          try {
            await deleteDoc(doc(db, 'eventosMes', id));
            listaEventos.removeChild(linha);
            console.log(`Evento ${id} excluído com sucesso.`);
          } catch (error) {
            console.error('Erro ao excluir o evento:', error);
            alert('Erro ao excluir o evento. Tente novamente.');
          }
        });
        
        
          listaEventos.appendChild(linha);
        };
        
        async function carregarEventosPainel() {
          const querySnapshot = await getDocs(collection(db, 'eventosMes'));
          listaEventos.innerHTML = '';
        
          querySnapshot.forEach((doc) => {
            adicionarEventoNaLista(doc.id, doc.data().descricao);
          });
        }
        
        window.addEventListener('DOMContentLoaded', carregarEventosPainel);


        document.getElementById("botaoEnviarWhatsapp").addEventListener("click", () => {
        if (!ultimoRole) {
        alert("Nenhum rolê cadastrado para enviar.");
        return;
        }

        const nome = ultimoRole.nomeRole || "Rolê sem nome";
        const data = ultimoRole.dataRole || "sem data";
        const hora = ultimoRole.horaRole || "sem horário";
        const endereco = ultimoRole.enderecoRole || "sem endereço";

        const mensagem = `🌟 Novo Rolê Marcado! 🌟%0A%0A🎉 Nome: ${nome}%0A📅 Data: ${data}%0A⏰ Horário: ${hora}%0A📍 Endereço: ${endereco}%0A%0AVBora gays !🚀`;

        const link = `https://wa.me/?text=${mensagem}`;

        window.open(link, '_blank');
        });
        
        // Secrets
        
        // Botão "Secrets"
document.getElementById("botaoSecrets").addEventListener("click", async () => {
  document.getElementById("painelBotoes").style.display = "none";
  document.getElementById("secretsContainer").style.display = "block";
  await carregarSegredosPendentes();
});

// Botão Voltar
document.getElementById("btnVoltarDosSegredos").addEventListener("click", () => {
  document.getElementById("secretsContainer").style.display = "none";
  document.getElementById("painelBotoes").style.display = "flex";
});

async function carregarSegredosPendentes() {
  const lista = document.getElementById("listaSegredos");
  lista.innerHTML = "";
  const q = query(collection(db, "segredos"), orderBy("criadoEm", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(docSnap => {
    const dado = docSnap.data();
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start flex-column";

    // Título (se houver)
    const titulo = dado.titulo || 'Sem título';
    const tituloDiv = document.createElement("strong");
    tituloDiv.innerText = titulo;
    tituloDiv.className = "mb-2";

    // Texto
    const textoDiv = document.createElement("div");
    textoDiv.innerText = dado.texto;

    // Botões
    const botoesDiv = document.createElement("div");
    botoesDiv.className = "mt-2 d-flex gap-2";

    const btnAprovar = document.createElement("button");
    btnAprovar.className = "btn btn-success btn-sm";
    btnAprovar.innerHTML = '<i class="bi bi-check-circle"></i> Aprovar';
    btnAprovar.onclick = async () => {
      await addDoc(collection(db, "segredosAprovados"), {
        titulo: dado.titulo || 'Sem título',
        texto: dado.texto,
        criadoEm: dado.criadoEm
      });
      await deleteDoc(doc(db, "segredos", docSnap.id));
      li.remove();
    };

    const btnRecusar = document.createElement("button");
    btnRecusar.className = "btn btn-danger btn-sm";
    btnRecusar.innerHTML = '<i class="bi bi-x-circle"></i> Recusar';
    btnRecusar.onclick = async () => {
      await deleteDoc(doc(db, "segredos", docSnap.id));
      li.remove();
    };

    botoesDiv.appendChild(btnAprovar);
    botoesDiv.appendChild(btnRecusar);
    li.appendChild(tituloDiv);
    li.appendChild(textoDiv);
    li.appendChild(botoesDiv);
    lista.appendChild(li);
  });
}


    const bugsContainer = document.getElementById('bugsContainer');
    const botoesContainer = document.getElementById('painelBotoes');
    const btnVerBugs = document.getElementById('botaoVerBugs');
    const btnVoltarDosBugs = document.getElementById('btnVoltarDosBugs');
    const bugsList = document.getElementById('bugsList');
    
    btnVerBugs.addEventListener('click', async () => {
      botoesContainer.style.display = 'none'; 
      bugsContainer.style.display = 'block'; 
    
      bugsList.innerHTML = "";
    
      const querySnapshot = await getDocs(collection(db, "bugs"));
      if (querySnapshot.empty) {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.textContent = "Nenhum bug relatado.";
        bugsList.appendChild(item);
      } else {
        querySnapshot.forEach((docSnapshot) => {
          const bug = docSnapshot.data();
          const bugId = docSnapshot.id;
    
          const item = document.createElement("li");
          item.className = "list-group-item d-flex justify-content-between align-items-center";
          item.innerHTML = `
            <span>${bug.descricao || "Bug sem descrição."}</span>
            <button class="btn btn-sm btn-danger btnExcluirBug" title="Excluir bug">
              <i class="bi bi-trash"></i>
            </button>
          `;
    
          item.querySelector(".btnExcluirBug").addEventListener("click", async () => {
            const confirmacao = confirm("Tem certeza que deseja excluir este bug?");
            if (confirmacao) {
              try {
                console.log("Tentando excluir o bug com ID:", bugId); 
                const bugRef = doc(db, "bugs", bugId); 
                await deleteDoc(bugRef); 
                item.remove();
                alert("Bug excluído com sucesso!");
              } catch (erro) {
                console.error("Erro ao excluir bug:", erro);
                alert("Não foi possível excluir o bug. Verifique o console para mais detalhes.");
              }
            }
          });
    
          bugsList.appendChild(item);
        });
      }
    });

btnVoltarDosBugs.addEventListener('click', () => {
  bugsContainer.style.display = 'none';
  botoesContainer.style.display = 'flex';
});

const botaoCorreioElegante = document.getElementById('botaoCorreioElegante');
const mensagensContainer = document.getElementById('mensagensContainer');

    // Definir a função excluirMensagem no escopo global
    window.excluirMensagem = async function(id) {
      try {
        const mensagemRef = doc(db, "correioElegante", id);
        await deleteDoc(mensagemRef);
        alert('Mensagem excluída com sucesso!');
        
        // Atualiza a lista de mensagens após a exclusão, sem fechar a seção
        const event = new Event('click');
        botaoCorreioElegante.dispatchEvent(event);
      } catch (error) {
        console.error("Erro ao excluir mensagem: ", error);
        alert('Ocorreu um erro ao excluir a mensagem.');
      }
    };
  
    // Função para mostrar mensagens de Correio Elegante
    botaoCorreioElegante.addEventListener('click', async () => {
      if (mensagensContainer.style.display === "none") {
        const querySnapshot = await getDocs(collection(db, "correioElegante"));
        mensagensContainer.innerHTML = "";
  
        if (querySnapshot.empty) {
          mensagensContainer.innerHTML = "<p>Nenhuma mensagem encontrada.</p>";
        } else {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const item = document.createElement("div");
            item.classList.add("mensagem-item");
  
            item.innerHTML = `
              <div>
                <div class="mensagem-usuarios">
                  <strong>Remetente:</strong> ${data.remetente || 'Sem remetente'}<br>
                  <strong>Destinatário:</strong> ${data.destinatario || 'Sem destinatário'}
                </div>
                <div class="mensagem-texto">${data.mensagem || 'Sem mensagem'}</div>
              </div>
              <button class="btn-lixeira" onclick="excluirMensagem('${doc.id}')">
                <i class="bi bi-trash-fill"></i>
              </button>`
            ;
            mensagensContainer.appendChild(item);
          });
        }
        mensagensContainer.style.display = "block";
      } else {
        mensagensContainer.style.display = "none";
      }
    });

        async function buscarNotificacoes(colecao, badgeId) {
  const ref = collection(db, colecao);

  // Contar o número de documentos na coleção
  const snapshot = await getDocs(ref);
  const total = snapshot.size;

  // Atualizando a badge correspondente
  const badge = document.getElementById(badgeId);
  
  if (total > 0) {
    badge.textContent = total;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}

// Função para atualizar as notificações em tempo real para cada coleção
function atualizarNotificacoesEmTempoReal() {

buscarNotificacoes("correioElegante", "badgeCorreioElegante");
buscarNotificacoes("bugs", "badgeVerBugs");
buscarNotificacoes("sugestoesReclamacoes", "badgeSugestoesReclamacoes");
  // Notificações para o Correio Elegante
  const correioRef = collection(db, "correioElegante");
  onSnapshot(correioRef, (snapshot) => {
    const totalMensagens = snapshot.size;
    const badge = document.getElementById("badgeCorreioElegante");
    badge.textContent = totalMensagens;
    badge.style.display = totalMensagens > 0 ? "inline-block" : "none";
  });

  // Notificações para os Bugs
  const bugsRef = collection(db, "bugs");
  onSnapshot(bugsRef, (snapshot) => {
    const totalBugs = snapshot.size;
    const badge = document.getElementById("badgeVerBugs");
    badge.textContent = totalBugs;
    badge.style.display = totalBugs > 0 ? "inline-block" : "none";
  });

  // Notificações para Sugestões/Reclamações
  const sugestoesRef = collection(db, "sugestoesReclamacoes");
  onSnapshot(sugestoesRef, (snapshot) => {
    const totalSugestoes = snapshot.size;
    const badge = document.getElementById("badgeSugestoesReclamacoes");
    badge.textContent = totalSugestoes;
    badge.style.display = totalSugestoes > 0 ? "inline-block" : "none";
  });

  // Notificações para brindes
    const trocasRef = query(collection(db, "trocas"), where("status", "==", "pendente"));
    onSnapshot(trocasRef, (snapshot) => {
      const total = snapshot.size;
      const badge = document.querySelector("#botaoBrindes .badge");
      badge.textContent = total;
      badge.style.display = total > 0 ? "inline-block" : "none";
    });

}

// Rodando as funções


// Atualizar as notificações em tempo real
atualizarNotificacoesEmTempoReal();

// Quando clicar nos botões, esconder a notificação (indicando que o admin visualizou)
document.getElementById("botaoCorreioElegante").addEventListener("click", function() {
  document.getElementById("badgeCorreioElegante").style.display = "none";
  // Se houver uma notificação no topo, escondê-la também
  document.getElementById("notificacaoTopoCorreio").style.display = "none"; // Ajuste o ID conforme necessário
});

document.getElementById("botaoVerBugs").addEventListener("click", function() {
  document.getElementById("badgeVerBugs").style.display = "none";
  // Se houver uma notificação no topo, escondê-la também
  document.getElementById("notificacaoTopoBugs").style.display = "none"; // Ajuste o ID conforme necessário
});

document.getElementById("botaoSugestoesReclamacoes").addEventListener("click", function() {
  document.getElementById("badgeSugestoesReclamacoes").style.display = "none";
  // Se houver uma notificação no topo, escondê-la também
  document.getElementById("notificacaoTopoSugestoes").style.display = "none"; // Ajuste o ID conforme necessário
});



const botaoSugestoesReclamacoes = document.getElementById('botaoSugestoesReclamacoes');
const sugestoesContainer = document.getElementById('sugestoesContainer');

botaoSugestoesReclamacoes.addEventListener('click', async () => {
  if (sugestoesContainer.style.display === "none") {
    const querySnapshot = await getDocs(collection(db, "sugestoesReclamacoes"));
    sugestoesContainer.innerHTML = "";

    if (querySnapshot.empty) {
      sugestoesContainer.innerHTML = "<p>Nenhuma sugestão ou reclamação encontrada.</p>";
    } else {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement("div");
        item.classList.add("mensagem-item");

        item.innerHTML = `
          <div>
            <div class="mensagem-titulo">${data.titulo || 'Sem título'}</div>
            <div class="mensagem-texto"><strong>Tipo:</strong> ${data.tipo || 'Sem tipo'}</div>
            <div class="mensagem-texto"><strong>Sobre alguém?</strong> ${data.sobreAlguem || 'Não informado'}</div>
            <div class="mensagem-texto"><strong>Mensagem:</strong><br> ${data.mensagem || 'Sem mensagem'}</div>
          </div>
          <button class="btn-lixeira" onclick="excluirSugestao('${doc.id}')">
            <i class="bi bi-trash-fill"></i>
          </button>
        `;
        sugestoesContainer.appendChild(item);
      });
    }
    sugestoesContainer.style.display = "block";
  } else {
    sugestoesContainer.style.display = "none";
  }
});

// Define no escopo global a função de excluir sugestões/reclamações
window.excluirSugestao = async function(id) {
  try {
    const mensagemRef = doc(db, "sugestoesReclamacoes", id);
    await deleteDoc(mensagemRef);
    alert('Mensagem excluída com sucesso!');

    // Atualiza a lista sem fechar a seção
    const event = new Event('click');
    botaoSugestoesReclamacoes.dispatchEvent(event);
  } catch (error) {
    console.error("Erro ao excluir mensagem: ", error);
    alert('Ocorreu um erro ao excluir a mensagem.');
  }
};

const botaoComunicados = document.getElementById("botaoComunicados");
const empreendimentoContainer = document.getElementById("empreendimentoContainer");

botaoComunicados.addEventListener("click", () => {
  const isVisible = empreendimentoContainer.style.display === "block";
  empreendimentoContainer.style.display = isVisible ? "none" : "block";
});

// Envio do formulário de empreendimento com múltiplas imagens
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("empreendimentoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const tituloInput = document.getElementById("tituloEmpreendedor");
    const descricaoInput = document.getElementById("descricaoEmpreendimento");
    const linkInput = document.getElementById("linkEmpreendedor");
    const imagensInput = document.getElementById("imagemEmpreendedor");

    if (!tituloInput || !descricaoInput || !linkInput || !imagensInput) {
      alert("Campos de formulário não encontrados.");
      return;
    }

    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const link = linkInput.value.trim();
    const arquivos = imagensInput.files;

    if (!titulo || !descricao || !link || arquivos.length === 0) {
      alert("Preencha todos os campos e selecione pelo menos uma imagem.");
      return;
    }

    try {
      const urls = [];

      for (const imagem of arquivos) {
        const storageRef = ref(storage, `empreendedores/${imagem.name}`);
        await uploadBytes(storageRef, imagem);
        const imagemUrl = await getDownloadURL(storageRef);
        urls.push(imagemUrl);
      }

      await addDoc(collection(db, "empreendedores"), {
        titulo,
        corpo: descricao,
        link,
        fotos: urls,
        criadoEm: new Date()
      });

      alert("Empreendimento divulgado com sucesso!");
      e.target.reset();
      empreendimentoContainer.style.display = "none";

    } catch (error) {
      console.error("Erro ao divulgar empreendimento:", error);
      alert("Erro ao divulgar empreendimento: " + error.message);
    }
  });
});


// Função para atualizar o ranking
async function atualizarRankingTop5() {
  try {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, orderBy("pontos", "desc"), limit(5));
    const snapshot = await getDocs(q);

    const rankingRef = collection(db, "ranking");

    // Limpa ranking anterior
    const rankingSnapshot = await getDocs(rankingRef);
    const deletePromises = rankingSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Insere novo ranking
    const insertPromises = snapshot.docs.map((documento, index) => {
      const user = documento.data();
      const dadosPublicos = {
        username: user.username || "Sem nome",
        pontos: user.pontos || 0,
        posicao: index + 1
      };
      return setDoc(doc(db, "ranking", documento.id), dadosPublicos);
    });

    await Promise.all(insertPromises);
    console.log("Ranking atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar ranking:", error);
  }
}

// Associa o clique ao botão
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnAtualizarRanking");
  if (btn) {
    btn.addEventListener("click", atualizarRankingTop5);
  }
});