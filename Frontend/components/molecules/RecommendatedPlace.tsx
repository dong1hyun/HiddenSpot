import { StyleSheet, Text } from "react-native";
import { getData } from "../../util/fetch";
import { useQuery } from "@tanstack/react-query";
import BottomSliderPlaceItem from "./BottomSliderPlaceItem";
import { RecommendationPlaceResponseType } from "../../lib/type";
import { View } from "react-native";
import { useMapContext } from "../../context/MapContext";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function RecommendatedPlace() {
    const getRecommendedPlaces = async (): Promise<RecommendationPlaceResponseType[]> => {
        try {
            const recommendedPlaces = await getData(`${API_URL}/place/recommendation`);
            return recommendedPlaces;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    const { mapRef } = useMapContext();

    const { data } = useQuery({
        queryFn: getRecommendedPlaces,
        queryKey: ["recommendationPlaces"]
    });
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MaterialIcons style={styles.thumbIcon} name="recommend" />
                <Text style={styles.title}>
                    추천 장소
                </Text>
            </View>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                keyExtractor={((_, index) => index.toString())}
                renderItem={({ item }) => (
                    <BottomSliderPlaceItem
                        photoUrl={item.photoUrl}
                        formattedAddress={item.address}
                        location={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        placeName={item.title}
                        likeCount={item._count.likedBy}
                        mapRef={mapRef}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    thumbIcon: {
        fontSize: 20,
    },
    title: {
        fontWeight: "bold",
        marginVertical: 12,
    },
    scrollContainer: {
        justifyContent: "flex-start",
        gap: 30,
        padding: 12,
    },
});