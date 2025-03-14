import { Image, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
import { PostResponseType } from "../../lib/type";

export default function Markers({ markers }: { markers: PostResponseType[] | undefined }) {
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
                    description={marker.description}
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
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "black"
    }
})