import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";

export default function AuthNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerTitle: "이메일 인증"
                }}
                name="Auth"
                component={AuthScreen}
            />
        </Stack.Navigator>
    )
};