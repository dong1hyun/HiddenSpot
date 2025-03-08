import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";

export default function MapNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: "지도"
                }}
            />
            <Stack.Screen
                name="AddPlace"
                component={AddPlaceScreen}
                options={{
                    title: "숨겨왔던 나의..."
                }}
            />
        </Stack.Navigator>
    );
}