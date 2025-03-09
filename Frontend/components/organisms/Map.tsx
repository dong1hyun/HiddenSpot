import MapView, { MapPressEvent, Marker } from "react-native-maps";

interface Props {
    location: { latitude: number; longitude: number };
    onMapPress: (e: MapPressEvent) => void;
    onMarkerPress: () => void;
    mapRef: React.RefObject<MapView>;
};

export default function Map({ onMapPress, location, onMarkerPress, mapRef }: Props) {
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