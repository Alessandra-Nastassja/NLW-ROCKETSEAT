import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface UF {
  label: string;
  value: string;
}

interface IBGECityResponse {
  nome: string;
}

interface City {
  label: string;
  value: string;
}

const Home = () => {
  const [uf, setUf] = useState<UF[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");

  const [city, setCity] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    console.log(selectedUf,
      selectedCity);
    

    navigation.navigate("Points", {
      selectedUf,
      selectedCity,
    });
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        const ufs = ufInitials.map((obj) => ({
          label: obj,
          value: obj,
        }));

        setUf(ufs);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        const cities = cityNames.map((obj) => ({
          label: obj,
          value: obj,
        }));

        setCity(cities);
      });
  }, [selectedUf]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{ label: "Informe sua UF", value: null }}
            value={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            items={city}
          />
          <RNPickerSelect
            placeholder={{ label: "Informe seu estado ", value: null }}
            value={selectedUf}
            onValueChange={(value) => setSelectedUf(value)}
            items={uf}
          />
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
