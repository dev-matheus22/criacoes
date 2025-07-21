import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAuth, onAuthStateChanged,  setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
  const provider = new GoogleAuthProvider();


  const loginForm = document.getElementById("loginUserForm");
  const errorMessage = document.getElementById("error-message");
  
  document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verifica se o usuário já existe na coleção "usuarios"
    const q = query(collection(db, "usuarios"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Novo usuário - salva na coleção
      await addDoc(collection(db, "usuarios"), {
        userId: user.uid,
        nome: user.displayName || "",
        username: user.email.split("@")[0], // exemplo de username baseado no email
        cidade: "", // você pode pedir isso depois
        email: user.email,
        foto: user.photoURL || ""
      });
      console.log("Usuário cadastrado com Google");
    } else {
      console.log("Usuário já cadastrado");
    }

    alert("Login realizado com sucesso!");

  } catch (error) {
    console.error("Erro no login com Google:", error);
    alert("Erro ao fazer login com Google");
  }
});

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Define a persistência para localStorage
      await setPersistence(auth, browserLocalPersistence);

      // Faz login normalmente
      await signInWithEmailAndPassword(auth, email, password);

      // Redireciona para o painel após login bem-sucedido
      window.location.href = "painelUser.php"; 
    } catch (error) {
      console.error("Erro ao logar:", error);
      errorMessage.style.display = "block";
    }
  });
  
  onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário já logado, redireciona direto
    window.location.href = "painelUser.php"; 
  }
});