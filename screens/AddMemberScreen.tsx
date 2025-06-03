import { Member } from "@/types/Member";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(tabs)"; // Adjust import path as needed
import React, { useState } from "react";

import { View, StyleSheet, Text, Alert } from "react-native";

import Button from "@/components/Button";
import Input from "@/components/Input";

type Props = NativeStackScreenProps<RootStackParamList, "AddMember"> & {
  onAdd: (newMember: Member) => void;
};

export default function AddMemberScreen({ navigation, onAdd }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      navigation.navigate("Home", { newMember });
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.addMemberTitle}>Add New Member</Text>
      </View>
      {/* <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      /> */}
      <Input label="Name" value={name} onChangeText={setName} />
      {/* <TextInput
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        style={styles.input}
      /> */}
      <Input label="Role" value={role} onChangeText={setRole} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {/* <TouchableOpacity
        disabled={loading}
        style={styles.addButton}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding..." : "Add Member"}
        </Text>
      </TouchableOpacity> */}
      <Button
        title={loading ? "Adding..." : "Add Member"}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  addMemberTitle: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
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
