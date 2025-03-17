import MapScreen from "../screens/MapScreen";
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
            </Stack.Navigator>
        </MapProvider>
    );
}