import { RootStackParamList } from "@/app/(tabs)";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

type Props = {
  route: ProfileScreenRouteProp;
};

function ProfileScreen({ route }: Props) {
  const { member } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.role}>{member.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  role: {
    fontSize: 18,
    color: "#666",
  },
});

export default ProfileScreen;
