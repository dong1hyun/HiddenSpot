import HomeScreen from "../screens/HomeScreen";
import BottomSheet from "../components/organisms/BottomSlider";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import { HomeStackParamList } from "../lib/type";

export default function HomeNavigator() {
    const Stack = createStackNavigator<HomeStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "홈"
                }}
            />
            <Stack.Screen
                name="PlaceDetail"
                component={PlaceDetailScreen}
                options={{
                    title: "세부정보"
                }}
            />
        </Stack.Navigator>
    )
}