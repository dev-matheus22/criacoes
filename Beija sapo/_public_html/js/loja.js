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

  async function carregarPontosUsuario() {
    const user = auth.currentUser;
    const pontosElement = document.getElementById('pontosUsuario');

    if (user) {
        try {
            const userDocRef = doc(db, "usuarios", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const dadosUsuario = userDocSnap.data();
                if (dadosUsuario && typeof dadosUsuario.pontos === 'number') {
                    pontosElement.textContent = `${dadosUsuario.pontos} pontos`;
                } else {
                    pontosElement.textContent = "0 pontos (dados de pontos ausentes)";
                    console.warn("Documento de pontos existe, mas 'quantidade' é inválido ou ausente.");
                }
            } else {
                pontosElement.textContent = "0 pontos"; // Usuário não tem documento de pontos ainda
                console.log("Documento de pontos do usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao carregar pontos do usuário:", error);
            pontosElement.textContent = "Erro ao carregar pontos.";
        }
    } else {
        pontosElement.textContent = "Faça login para ver seus pontos.";
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        carregarPontosUsuario();
    } else {
        document.getElementById('pontosUsuario').textContent = "Faça login para ver seus pontos.";
    }
});

carregarPontosUsuario(); 

async function carregarBrindes() {
  const lista = document.getElementById("listaBrindes");
  lista.innerHTML = "";

  const brindesSnapshot = await getDocs(collection(db, "brindes"));
  const user = auth.currentUser;

  if (!user) {
    lista.innerHTML = "<p class='text-paragrafo text-center'>Faça login para ver os brindes disponíveis.</p>";
    return;
  }

  const userDocRef = doc(db, "usuarios", user.uid);
  const userDoc = await getDoc(userDocRef);
  const pontosAtuais = userDoc.exists() ? userDoc.data().pontos || 0 : 0;

  brindesSnapshot.forEach((docBrinde) => {
    const data = docBrinde.data();
    const estoqueHtml = data.estoqueDisponivel
  ? `<p class="text-success fw-bold"><i class="bi bi-check-circle"></i> Estoque disponível</p>`
  : `<p class="text-danger fw-bold"><i class="bi bi-x-circle"></i> Sem estoque</p>`;


    const card = document.createElement("div");
    card.className = "col-12 col-md-5 d-flex justify-content-center";
    card.innerHTML = `
      <div class="card shadow-sm border-0" style="background-color: #ffffffcc; border-radius: 16px; width: 200px;">
        <img src="${data.imagemUrl}" class="card-img-top" alt="${data.nome}" style="border-radius: 16px 16px 0 0;">
        <div class="card-body text-center">
          <h5 class="card-title" style="color: #5e35b1;">${data.nome}</h5>
          <p class="card-text text-paragrafo">${data.descricao}</p>
          <p class="text-success fw-bold">💰 Custa: ${data.custo} pontos</p>
          ${estoqueHtml}
          <button class="btn btn-success w-100 rounded-pill">Trocar</button>
        </div>
      </div>
    `;

    const botaoTrocar = card.querySelector("button");
    botaoTrocar.addEventListener("click", async () => {
      if (pontosAtuais < data.custo) {
        alert("Você não tem pontos suficientes para trocar por este brinde.");
        return;
      }

      try {
        // Registrar a troca
        await addDoc(collection(db, "trocas"), {
          idUsuario: user.uid,
          nomeBrinde: data.nome,
          idBrinde: docBrinde.id,
          dataSolicitacao: new Date(),
          status: "pendente"
        });

        // Subtrair os pontos
        await updateDoc(userDocRef, {
          pontos: increment(-data.custo)
        });

        // Atualizar a exibição dos pontos
        carregarPontosUsuario();

        alert("A solicitação foi enviada ao administrador! Compareça ao próximo rolê para pegar o brinde.");
      } catch (error) {
        console.error("Erro ao registrar a troca:", error);
        alert("Erro ao registrar a troca. Tente novamente.");
      }
    });

    lista.appendChild(card);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    carregarPontosUsuario();
    carregarBrindes();
  }
});