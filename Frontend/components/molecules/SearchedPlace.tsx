import { StyleSheet, Text } from "react-native";
import BottomSliderPlaceItem from "./BottomSliderPlaceItem";
import { useMapContext } from "../../context/MapContext";
import { PlaceType } from "../../lib/type";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function SearchedPlace({ places }: { places: PlaceType[] }) {
    const { mapRef } = useMapContext();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>검색결과</Text>
            <FlatList
                contentContainerStyle={styles.scrollContainer}
                data={places}
                keyExtractor={((_, index) => index.toString())}
                renderItem={(itemData) => (
                    <BottomSliderPlaceItem
                        mapRef={mapRef}
                        photoUrl={itemData.item.photoUrl}
                        placeName={itemData.item.placeName}
                        location={itemData.item.location}
                        formattedAddress={itemData.item.formattedAddress}
                    />
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginVertical: 12,
    },
    scrollContainer: {
        justifyContent: "flex-start",
        gap: 30,
        padding:12
    },
});