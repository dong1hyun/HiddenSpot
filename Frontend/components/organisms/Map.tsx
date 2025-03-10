import MapView, { Marker } from "react-native-maps";
import { useMapContext } from "../../context/MapContext";

export default function Map({ mapRef }: {mapRef: React.RefObject<MapView>}) {
    const {onMapPress, location, onMarkerPress} = useMapContext();
    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.5665,
                longitude: 126.9780,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            onPress={onMapPress}
        >
            <Marker
                coordinate={location}
                title="선택된 장소"
                onPress={onMarkerPress}
            />
        </MapView>
    )
}