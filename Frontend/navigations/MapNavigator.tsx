import MapScreen from "../screens/MapScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import { MapStackParamList } from "../lib/type";
import { createStackNavigator } from "@react-navigation/stack";
import MapProvider from "../context/MapContext";

export default function MapNavigator() {
    const Stack = createStackNavigator<MapStackParamList>();

    return (
        <MapProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        headerShown: false
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
        </MapProvider>
    );
}