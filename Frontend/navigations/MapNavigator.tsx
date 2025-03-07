import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/MapScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";

export default function MapNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="map" component={MapScreen} />
            <Stack.Screen name="addPlace" component={AddPlaceScreen} />
        </Stack.Navigator>
    );
}