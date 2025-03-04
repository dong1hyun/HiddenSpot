import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

export default function AppNavigator() {
  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
  }
});