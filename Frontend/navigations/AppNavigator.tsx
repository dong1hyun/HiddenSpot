import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import MapNavigator from "./MapNavigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import MyPageNavigator from "./MyPageNavigator";


export default function AppNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: "#636e72",
        tabBarStyle: {
          paddingTop: 5,
          height: 50
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: "홈",
          tabBarIcon: (({size, color}) => {
            return <FontAwesome name="home" size={size} color={color} />
          }),
          popToTopOnBlur: true
        }}
        name="HomeNavigator"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (({size, color}) => {
            return <FontAwesome6Icon name="map-location-dot" size={size} color={color} />
          }),
        }}
        name="MapNavigator"
        component={MapNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (({size, color}) => {
            return <FontAwesome name="user" size={size} color={color} />
          }),
        }}
        name="MyPageNavigator"
        component={MyPageNavigator}
      />
    </Tab.Navigator>
  )
}