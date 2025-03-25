import { Marker } from "react-native-maps";
import { LocationType } from "../../lib/type";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

export default function MyLocationMarker({latitude, longitude}: LocationType) {
  return (
    <Marker 
      coordinate={{
        latitude,
        longitude
      }}
      title="현 위치"
    >
        <MaterialCommunityIcons style={styles.me} name="human-greeting" />
    </Marker>
  )
}

const styles = StyleSheet.create({
  me: {
    fontSize: 24,
    color: "#0984e3",
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    borderRadius: 24,
    padding: 4
  }
})