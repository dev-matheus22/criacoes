import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

async function carregarSegredosAprovados() {
  const q = query(collection(db, "segredosAprovados"), orderBy("criadoEm", "desc"));
  const querySnapshot = await getDocs(q);
  const container = document.getElementById("secretsContainer");

  querySnapshot.forEach(async (docSnap) => {
    const segredo = docSnap.data();
    const titulo = segredo.titulo || "Segredo sem título";

    console.log("Título do segredo:", titulo); // 👈 Log para depuração

    const autorId = segredo.autorId;
    let nomeAutor = "Anônimo";

    if (autorId) {
      try {
        const userDoc = await getDoc(doc(db, "usuarios", autorId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          nomeAutor = userData.nome || "Usuário sem nome";
        }
      } catch (erro) {
        console.error("Erro ao buscar autor:", erro);
      }
    }

    const div = document.createElement("div");
    div.classList.add("p-3", "rounded", "shadow");
    div.classList.add('segredo-card');
    div.style.backgroundColor = "rgba(240, 230, 255, 0.6)";




    div.innerHTML = `
      <h5 class="mb-2" style="color: #fff;">${titulo}</h5>
      <p class="text-paragrafo">${segredo.texto}</p>
    `;

    container.appendChild(div);
  });
}

carregarSegredosAprovados();