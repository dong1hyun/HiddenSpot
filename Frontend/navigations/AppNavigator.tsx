import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyPageScreen from "../screens/MyPageScreen";
import HomeNavigator from "./HomeNavigator";
import MapScreen from "../screens/MapScreen";

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="HomeNavigator"
        component={HomeNavigator}
      />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
  }
});