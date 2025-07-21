 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore, collection, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const strengthBar = document.getElementById("password-strength-bar");
  const strengthText = document.getElementById("password-strength-text");

  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    const strength = calculateStrength(val);

    strengthBar.style.width = `${strength.percent}%`;
    strengthBar.className = `progress-bar ${strength.color}`;
    strengthText.textContent = strength.message;
  });

  function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      return { percent: 33, color: "bg-danger", message: "Senha fraca" };
    } else if (score === 3 || score === 4) {
      return { percent: 66, color: "bg-warning", message: "Senha média" };
    } else {
      return { percent: 100, color: "bg-success", message: "Senha forte" };
    }
  }

  document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const sapoId = document.getElementById("username").value.trim();


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;



      // Enviar email de verificação
      await sendEmailVerification(user);

      await setDoc(doc(db, "usuarios", user.uid), {
        userId: user.uid,
        nome,
        idade,
        cidade,
        telefone,
        email,
        username: sapoId,
        dataCadastro: new Date()
      });

      alert("Usuário cadastrado com sucesso! Um email de verificação foi enviado.");
      window.location.href = "loginUser.html";

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  });