import { StyleSheet, Text } from "react-native";
import { getData } from "../../util/fetch";
import { useQuery } from "@tanstack/react-query";
import BottomSliderPlaceItem from "./BottomSliderPlaceItem";
import { RecommendationPlaceResponseType } from "../../lib/type";
import { View } from "react-native";
import { useMapContext } from "../../context/MapContext";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";

export default function RecommendatedPlace() {
    const getRecommendedPlaces = async (): Promise<RecommendationPlaceResponseType[] | undefined> => {
        try {
            const recommendedPlaces = await getData(`${API_URL}/place/recommendation`);
            return recommendedPlaces;
        } catch (error) {
            console.error(error);
        }
    }

    const {mapRef} = useMapContext();

    const {data} = useQuery({
        queryFn: getRecommendedPlaces,
        queryKey: ["places"]
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                추천 장소
            </Text>
            {
                data ?
                    <FlatList
                        data={data}
                        contentContainerStyle={styles.scrollContainer}
                        keyExtractor={((_, index) => index.toString())}
                        renderItem={({item}) => (
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
                    /> : null
            }
        </View>
    );
};

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
        padding: 12,
      },
});