import { createStackNavigator } from "@react-navigation/stack"
import { MyPageStackParamList } from "../lib/type";
import MyPageScreen from "../screens/MyPageScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import Logo from "../components/atoms/Logo";

export default function MyPageNavigator() {
    const Stack = createStackNavigator<MyPageStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: () => <Logo />
                }}
                name="MyPage"
                component={MyPageScreen}
            />
            <Stack.Screen
            options={
                ({route}) => ({title: route.params.headerTitle})
            }
                name="PlaceList"
                component={PlaceListScreen}
            />
        </Stack.Navigator>
    )
}