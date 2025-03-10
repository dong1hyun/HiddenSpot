import HomeScreen from "../screens/HomeScreen";
import BottomSheet from "../components/organisms/BottomSlider";
import { createStackNavigator } from "@react-navigation/stack";

export default function HomeNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: "홈"
            }}
            />
        </Stack.Navigator>
    )
}