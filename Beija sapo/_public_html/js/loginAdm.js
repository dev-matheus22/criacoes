import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, setPersistence, onAuthStateChanged, browserLocalPersistence, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDkMTTM5yJbyIzjCl3vovJXx1dlNEX2IpU",
    authDomain: "beija-sapo.firebaseapp.com",
    projectId: "beija-sapo",
    storageBucket: "beija-sapo.appspot.com",
    messagingSenderId: "429297677162",
    appId: "1:429297677162:web:3792b9546b7b44a16e6b13"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      // Primeiro configuramos a persistência local
      await setPersistence(auth, browserLocalPersistence);

      // Depois fazemos o login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("UID do usuário autenticado:", user.uid);

      const adminDoc = await getDoc(doc(db, "admin", user.uid));
      console.log("Document ID do admin:", user.uid);
      console.log("Dados do documento:", adminDoc.data());

      if (adminDoc.exists() && adminDoc.data().role === "admin") {
        window.location.href = "painelAdm.html";
      } else {
        alert("Acesso restrito aos administradores.");
        document.getElementById("error-message").style.display = "block";
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      document.getElementById("error-message").style.display = "block";
    }
  });
  
  onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const adminDoc = await getDoc(doc(db, "admin", user.uid));
      if (adminDoc.exists() && adminDoc.data().role === "admin") {
        window.location.href = "painelAdm.html";
      }
    } catch (error) {
      console.error("Erro ao verificar admin:", error);
    }
  }
});