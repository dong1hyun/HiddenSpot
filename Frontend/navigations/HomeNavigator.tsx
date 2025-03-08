import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

export default function HomeNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            />
        </Stack.Navigator>
    )
}