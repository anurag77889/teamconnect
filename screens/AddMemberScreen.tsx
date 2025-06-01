import { Member } from "@/types/Member";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(tabs)"; // Adjust import path as needed
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { View, TextInput, Button, StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "AddMember"> & {
  addMember: (member: Member) => void;
};

export default function AddMemberScreen({ navigation, addMember }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleAdd = () => {
    if (name && role) {
      const newMember: Member = {
        id: uuidv4(),
        name,
        role,
      };
      addMember(newMember);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Add Member" onPress={handleAdd} />
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
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
});
