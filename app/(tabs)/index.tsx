import { Member } from "@/types/Member";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import HomeScreen from "@/screens/HomeScreen";
import AddMemberScreen from "@/screens/AddMemberScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import GetStartedScreen from "@/screens/GetStartedScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  GetStartedScreen: undefined;
  Home: undefined;
  AddMember: undefined;
  Profile: { member: Member };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const STORAGE_KEY = "@team_members";

  useEffect(() => {
    // Load members on App start
    const loadMembers = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          setMembers(JSON.parse(data));
        }
      } catch (error) {
        console.error("Failed to load members: ", error);
      }
    };
    loadMembers();
  }, []);

  //Save members on every change
  const saveMembers = async (newMembers: Member[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMembers));
    } catch (error) {
      console.error("Failed to save members: ", error);
    }
  };

  useEffect(() => {
    saveMembers(members);
  }, [members]);

  const addMember = (newMember: Member) => {
    const updated = [...members, newMember];
    setMembers(updated);
  };

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GetStartedScreen">
          <Stack.Screen
            name="GetStartedScreen"
            options={{ headerShown: false }}
          >
            {(props) => <GetStartedScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} members={members} />}
          </Stack.Screen>
          <Stack.Screen name="AddMember">
            {(props) => <AddMemberScreen {...props} addMember={addMember} />}
          </Stack.Screen>
          <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
