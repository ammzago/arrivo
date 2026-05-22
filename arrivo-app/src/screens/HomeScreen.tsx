import { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, ScrollView, Animated,
} from "react-native";

const VERDE = "#7fcf8e";
const VERDE_ESCURO = "#5db870";
const VERDE_SELECIONADO = "#a8ddb5";

const caronas = [
  { veiculo: "van", destino: "centro da cidade", data: "10/03", hora: "14:00" },
  { veiculo: "ônibus", destino: "praça da esperança", data: "12/04", hora: "16:00" },
  { veiculo: "carro", destino: "faculdade", data: "28/05", hora: "12:00" },
];

function CaronaRow({ carona, delay }: { carona: typeof caronas[0]; delay: number }) {
  const translateY = useRef(new Animated.Value(60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.tabelaRow, { transform: [{ translateY }], opacity }]}>
      <Image source={require("../../assets/images/myImage.png")} style={styles.avatarTabela} />
      <Text style={styles.tabelaTexto}>{carona.veiculo}</Text>
      <Text style={styles.tabelaTexto}>{carona.destino}</Text>
      <Text style={styles.tabelaTexto}>{carona.data}{"\n"}{carona.hora}</Text>
    </Animated.View>
  );
}

export default function HomeScreen({ nome }: { nome: string }) {
  const [navAtivo, setNavAtivo] = useState<"home" | "settings" | "travel">("home");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/myImage.png")} style={styles.avatar} />
        <Image source={require("../../assets/images/logoWritten.png")} style={styles.logoWritten} resizeMode="contain" />
        <TouchableOpacity>
          <Image source={require("../../assets/images/notification.png")} style={styles.iconHeader} />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.conteudo}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.saudacao}>Olá {nome},{"\n"}vai uma carona?</Text>
          <Text style={styles.subtitulo}>Você não tem nenhuma por agora :(</Text>
          <Text style={styles.labelCodigo}>insira o código da sua carona para começar:</Text>
          <View style={styles.codigoRow}>
            <TextInput style={styles.codigoInput} />
            <TouchableOpacity style={styles.codigoBotao}>
              <Text style={styles.codigoBotaoTexto}>?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabela */}
        <View style={styles.tabela}>
          <View style={styles.tabelaHeader}>
            <Text style={styles.tabelaHeaderTexto}>motorista</Text>
            <Text style={styles.tabelaHeaderTexto}>veículo</Text>
            <Text style={styles.tabelaHeaderTexto}>destino</Text>
            <Text style={styles.tabelaHeaderTexto}>data e hora</Text>
          </View>
          {caronas.map((c, i) => (
            <CaronaRow key={i} carona={c} delay={i * 150} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, navAtivo === "settings" && styles.navAtivo]}
          onPress={() => setNavAtivo("settings")}
        >
          <Image source={require("../../assets/images/settings.png")} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, navAtivo === "home" && styles.navAtivo]}
          onPress={() => setNavAtivo("home")}
        >
          <Image source={require("../../assets/images/home.png")} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, navAtivo === "travel" && styles.navAtivo]}
          onPress={() => setNavAtivo("travel")}
        >
          <Image source={require("../../assets/images/travel.png")} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VERDE },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 48,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  logoWritten: { width: 120, height: 40 },
  iconHeader: { width: 28, height: 28, tintColor: "#fff" },
  conteudo: { flex: 1 },
  saudacao: { fontSize: 28, fontWeight: "bold", color: "#fff", marginTop: 8 },
  subtitulo: { fontSize: 14, color: "#fff", marginTop: 4, marginBottom: 16 },
  labelCodigo: { fontSize: 13, color: "#fff", fontStyle: "italic", marginBottom: 8 },
  codigoRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  codigoInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 25,
    height: 44,
    paddingHorizontal: 16,
  },
  codigoBotao: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: VERDE_ESCURO,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  codigoBotaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  tabela: {
    marginHorizontal: 0,
    marginBottom: 20,
    overflow: "hidden",
  },
  tabelaHeader: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 8,
    },
  tabelaHeaderTexto: {
    flex: 1,
    color: VERDE_ESCURO,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    },
  tabelaRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  avatarTabela: {
    width: 36,
    height: 36,
    borderRadius: 18,
    flex: 0,
    marginRight: 4,
    },
  tabelaTexto: {
    flex: 1,
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: VERDE_ESCURO,
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  navAtivo: { backgroundColor: VERDE_SELECIONADO },
  navIcon: { width: 28, height: 28, tintColor: "#fff" },
});