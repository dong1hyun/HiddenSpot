import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default function AuthNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: "로그인"
                }}
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "회원가입"
                }}
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
};