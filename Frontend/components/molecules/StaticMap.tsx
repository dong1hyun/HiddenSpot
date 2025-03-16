import MapView, { Marker } from "react-native-maps";
import { LocationType } from "../../lib/type";

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
                title="선택된 장소"
                coordinate={{
                    latitude,
                    longitude
                }}
            />
        </MapView>
    );
};