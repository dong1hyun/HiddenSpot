import MapView, { Marker } from "react-native-maps";
import { LocationType } from "../../lib/type";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props extends LocationType {
    style: object;
}

export default function StaticMap({ latitude, longitude, style }: Props) {
    return (
        <MapView
            style={style}
            initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
        >
            <Marker
                title="위치"
                coordinate={{
                    latitude,
                    longitude
                }}
            >
                <Ionicons name="pin" style={{ fontSize: 42, color: "#ff3939" }} />
            </Marker>
        </MapView>
    );
};