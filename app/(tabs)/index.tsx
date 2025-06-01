import { Member } from "@/types/Member";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import HomeScreen from "@/screens/HomeScreen";
import AddMemberScreen from "@/screens/AddMemberScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import GetStartedScreen from "@/screens/GetStartedScreen";

export type RootStackParamList = {
  GetStartedScreen: undefined;
  Home: undefined;
  AddMember: undefined;
  Profile: { member: Member };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);

  const addMember = (member: Member) => {
    setMembers((prev) => [...prev, member]);
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
          <Stack.Screen name="Home" options={{ headerShown: false }}>
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
