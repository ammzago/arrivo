import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen({
  onCadastro,
  onLogin,
}: {
  onCadastro: () => void;
  onLogin: () => void;
}) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    if (!usuario || !senha) {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, usuario, senha);
      onLogin();
    } catch (error) {
      alert("E-mail ou senha incorretos.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card de login */}
      <View style={styles.card}>
        {/* Campo Usuário */}
        <Text style={styles.label}>USUÁRIO</Text>
        <View style={styles.inputRow}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#fff"
          />
        </View>

        {/* Campo Senha */}
        <Text style={styles.label}>SENHA</Text>
        <View style={styles.inputRow}>
          <Image
            source={require("../../assets/images/password.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholderTextColor="#fff"
          />
        </View>

        {/* Botão Login */}
        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>LOGIN</Text>
        </TouchableOpacity>

        {/* Primeiro Acesso */}
        <TouchableOpacity onPress={onCadastro}>
          <Text style={styles.primeiroAcesso}>PRIMEIRO ACESSO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const VERDE = "#7fcf8e";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERDE,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 2,
    alignSelf: "center",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "100%",
    height: 44,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#fff",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  botao: {
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 25,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 2,
  },
  primeiroAcesso: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 2,
  },
});