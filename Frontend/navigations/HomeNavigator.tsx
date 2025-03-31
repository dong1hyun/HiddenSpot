import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import { HomeStackParamList } from "../lib/type";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import Logo from "../components/atoms/Logo";
import UserInfoScreen from "../screens/UserInfoScreen";

export default function HomeNavigator() {
    const Stack = createStackNavigator<HomeStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: () => <Logo />
                }}
            />
            <Stack.Screen
                name="PlaceDetail"
                component={PlaceDetailScreen}
                options={{
                    title: "세부정보"
                }}
            />
            <Stack.Screen
                name="AddPlace"
                component={AddPlaceScreen}
                options={{
                    title: "숨겨왔던 나의..."
                }}
            />
            <Stack.Screen 
                name="UserInfo"
                component={UserInfoScreen}
            />
        </Stack.Navigator>
    )
}