import { Member } from "@/types/Member";
import { RootStackParamList } from "@/app/(tabs)";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: Props) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch team members");
        const data = await res.json();

        const formatted: Member[] = data.map((user: any) => ({
          id: user.id.toString(),
          name: user.name,
          role: user.company?.bs || "Team Member",
        }));
        setMembers(formatted);
        setError(null);
      } catch (err) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} />
        <Text>Loading team...</Text>
      </View>
    );
  }

  return (
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
      ListHeaderComponent={<Text style={styles.title}>Team Members</Text>}
      ListEmptyComponent={<Text style={styles.empty}>No team members yet</Text>}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 15,
    color: "#000",
  },
  memberCard: {
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#000",
    borderRadius: 10,
    marginTop: 15,
    elevation: 2,
  },
  memberName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#92dce5",
  },
  memberRole: {
    marginTop: 5,
    fontSize: 20,
    color: "#777",
  },
  empty: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#aaa",
  },
});

export default HomeScreen;
