import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const VERDE = "#7fcf8e";

export default function CadastroScreen({ onVoltar }: { onVoltar: () => void }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ddd, setDdd] = useState("");
  const [celular, setCelular] = useState("");
  const [tipo, setTipo] = useState<"passageiro" | "motorista">("passageiro");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function handleCadastro() {
    if (!nome || !email || !senha || !celular) {
      alert("Preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "usuarios", credencial.user.uid), {
        nome,
        email,
        celular: `(${ddd}) ${celular}`,
        tipo,
        criadoEm: new Date().toISOString(),
      });
      alert("Conta criada com sucesso!");
      onVoltar();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        alert("A senha deve ter pelo menos 6 caracteres.");
      } else {
        alert("Erro ao criar conta. Tente novamente.");
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        {/* Nome */}
        <View style={styles.row}>
          <Text style={styles.label}>NOME</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} maxLength={10} />
        </View>

        {/* Email */}
        <View style={styles.row}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        {/* Celular */}
        <View style={styles.row}>
          <Text style={styles.label}>CELULAR</Text>
          <TextInput style={[styles.input, styles.ddd]} value={ddd} onChangeText={setDdd} maxLength={2} keyboardType="numeric" placeholder="DDD" placeholderTextColor="#fff" />
          <TextInput style={[styles.input, { flex: 1 }]} value={celular} onChangeText={setCelular} keyboardType="numeric" />
        </View>

        {/* Tipo de conta */}
        <View style={styles.row}>
          <Text style={styles.label}>TIPO DE CONTA</Text>
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, tipo === "passageiro" && styles.toggleAtivo]}
              onPress={() => setTipo("passageiro")}
            >
              <Text style={styles.toggleTexto}>PASSAGEIRO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, tipo === "motorista" && styles.toggleAtivo]}
              onPress={() => setTipo("motorista")}
            >
              <Text style={styles.toggleTexto}>MOTORISTA</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divisor} />

        {/* Senha */}
        <View style={styles.row}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
        </View>

        {/* Confirmar Senha */}
        <View style={styles.row}>
          <Text style={[styles.label, { fontSize: 10 }]}>CONFIRMAR{"\n"}SENHA</Text>
          <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
        </View>

        {/* Botão */}
        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.botaoTexto}>CRIAR CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onVoltar}>
          <Text style={styles.login}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: VERDE, alignItems: "center", padding: 24, paddingTop: 48 },
  logo: { width: 180, height: 180, marginBottom: 24 },
  card: { width: "100%", backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 20, padding: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  label: { color: "#fff", fontWeight: "bold", fontSize: 11, letterSpacing: 1, width: 80 },
  input: { flex: 1, backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 20, height: 36, paddingHorizontal: 12, color: "#fff" },
  ddd: { width: 52, flex: 0, marginRight: 8 },
  toggle: { flexDirection: "row", borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: "#fff" },
  toggleBtn: { paddingHorizontal: 14, paddingVertical: 6 },
  toggleAtivo: { backgroundColor: "rgba(255,255,255,0.4)" },
  toggleTexto: { color: "#fff", fontWeight: "bold", fontSize: 11 },
  divisor: { height: 1, backgroundColor: "rgba(255,255,255,0.5)", marginVertical: 12 },
  botao: { backgroundColor: "rgba(255,255,255,0.4)", borderRadius: 25, paddingVertical: 14, alignItems: "center", marginTop: 8, marginBottom: 12 },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 16, letterSpacing: 2 },
  login: { color: "#fff", fontWeight: "bold", fontSize: 13, letterSpacing: 2, textAlign: "center" },
});