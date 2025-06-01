import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type RootStackParamList = {
  GetStartedScreen: undefined;
  Home: undefined;
};

type GetStartedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GetStartedScreen"
>;

type Props = {
  navigation: GetStartedNavigationProp;
};

function GetStartedScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Team Connect</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.addButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B303A",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleView: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    color: "#92DCE5",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonView: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: "#92dce5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default GetStartedScreen;
