import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import HomeScreen from "../screens/HomeScreen";
import { useEffect } from "react";

export default function App() {
  const [tela, setTela] = useState<"login" | "cadastro" | "home">("login");
  const [nomeUsuario, setNomeUsuario] = useState("usuário");

  async function handleLogin() {
    const user = auth.currentUser;
    if (user) {
      const snap = await getDoc(doc(db, "usuarios", user.uid));
      if (snap.exists()) {
        setNomeUsuario(snap.data().nome);
      }
    }
    setTela("home");
  }

  if (tela === "cadastro") return <CadastroScreen onVoltar={() => setTela("login")} />;
  if (tela === "home") return <HomeScreen nome={nomeUsuario} />;
  return (
    <LoginScreen
      onCadastro={() => setTela("cadastro")}
      onLogin={handleLogin}
    />
  );
}