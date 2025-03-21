import { Image, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { PostResponseType } from "../../lib/type";
import { useMapContext } from "../../context/MapContext";

export default function Markers({ markers }: { markers: PostResponseType[] | undefined }) {
    const {setMapPressed, setModalVisible, setTitle, setPhotoUrl, setId} = useMapContext();
    const onMarkerPress = (id: number, title: string, photoUrl: string) => {
        setId(id);
        setMapPressed(false);
        setModalVisible(true);
        setTitle(title);
        setPhotoUrl(photoUrl);
    }
    if(!markers) return null;
    return (
        <>
            {markers.map((marker) => (
                <Marker
                    style={styles.marker}
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                    }}
                    title={marker.title}
                    onPress={() => onMarkerPress(marker.id, marker.title, marker.photoUrl)}
                >
                    <Image style={styles.image} resizeMode="center" source={{ uri: marker.photoUrl }} />
                </Marker>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    marker: {
    },
    image: {
        width: 40,
        height: 40,
    }
});