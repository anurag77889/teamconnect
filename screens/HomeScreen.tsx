import { Member } from "@/types/Member";
import { RootStackParamList } from "@/app/(tabs)";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home"> & {
  members: Member[];
};

function HomeScreen({ navigation, members }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.memberCard}
            onPress={() => navigation.navigate("Profile", { member: item })}
          >
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberRole}>{item.role}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No team members yet</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMember")}
      >
        <Text style={styles.addButtonText}>+ Add Member</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2b303a",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "#fff",
  },
  memberCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
  },
  memberRole: {
    fontSize: 14,
    color: "#777",
  },
  empty: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#aaa",
  },
  addButton: {
    backgroundColor: "#92dce5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default HomeScreen;
