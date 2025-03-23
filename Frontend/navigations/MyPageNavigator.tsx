import { createStackNavigator } from "@react-navigation/stack"
import { MyPageStackParamList } from "../lib/type";
import MyPageScreen from "../screens/MyPageScreen";
import PlaceListScreen from "../screens/PlaceListScreen";

export default function MyPageNavigator() {
    const Stack = createStackNavigator<MyPageStackParamList>();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: "내 정보"
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