import { Member } from "@/types/Member";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(tabs)"; // Adjust import path as needed
import React, { useState } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

type Props = NativeStackScreenProps<RootStackParamList, "AddMember"> & {
  addMember: (member: Member) => void;
};

export default function AddMemberScreen({ navigation, addMember }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const nav = useNavigation();
  const { onAdd } = route.params as { onAdd: (member: Member) => void };

  const handleSubmit = async () => {
    if (!name.trim() || !role.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role }),
      });
      if (!res.ok) throw new Error("Failed to add member");

      const result = await res.json();
      console.log("New member added: ", result);

      const newMember: Member = {
        id: Date.now().toString(),
        name,
        role,
      };
      onAdd(newMember);
      Alert.alert("Success", "Member added!");
      setName("");
      setRole("");
      navigation.goBack();
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Add New Member</Text>
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        style={styles.input}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TouchableOpacity
        disabled={loading}
        style={styles.addButton}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding..." : "Add Member"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: "#92dce5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
});
