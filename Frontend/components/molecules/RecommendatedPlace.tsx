import { FlatList, StyleSheet, Text } from "react-native";
import { getData } from "../../util/fetch";
import { useQuery } from "@tanstack/react-query";
import BottomSliderPlaceItem from "./BottomSliderPlaceItem";
import { RecommendationPlaceResponseType } from "../../lib/type";
import { View } from "react-native";
import { useMapContext } from "../../context/MapContext";
import { API_URL } from "@env";

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
        queryKey: ["recommendatedPlace"]
    });

    return (
        <View>
            <Text style={styles.title}>
                추천 장소
            </Text>
            {
                data ?
                    <FlatList
                        data={data}
                        contentContainerStyle={styles.scrollContainer}
                        renderItem={({item}) => (
                            <BottomSliderPlaceItem
                                photoUrl={item.photoUrl}
                                formattedAddress={item.address}
                                location={{
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }}
                                placeName={item.title}
                                mapRef={mapRef}
                            />
                        )}
                    /> : <Text>없음</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginVertical: 12,
    },
    scrollContainer: {
        justifyContent: "flex-start",
        gap: 30
      },
});