import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import HomePlaceItem from "../components/molecules/HomePlaceItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MyPageStackParamList, PostResponseType } from "../lib/type";
import { getData } from "../util/fetch";
import AuthStore from "../store/AuthStore";
import { RouteProp } from "@react-navigation/native";
import MyPagePlaceItem from "../components/molecules/MyPagePlaceItem";
import Spinner from "../components/atoms/SpinLoading";
import { API_URL } from "@env";

type PlaceListScreenRouteProp = RouteProp<MyPageStackParamList, "PlaceList">;

export default function PlaceListScreen({route}: {route: PlaceListScreenRouteProp}) {
    const { email } = AuthStore();
    const {type} = route.params;
    const fetchData = async (pageParam: number): Promise<PostResponseType[]> => {
        const response = await getData(`${API_URL}/place/${type}?userEmail=${email}&page=${pageParam}`);
        return response;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['places', type, email],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined;
        },
        refetchInterval: 60000
    });
    const onEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }
    const places = data?.pages.flat();
    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                renderItem={({ item }) => (
                    <MyPagePlaceItem placeData={item} />
                )}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
            />
            <Spinner isLoading={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    image: {
        width: 50,
        height: 50
    },
    plusIcon: {
        position: "absolute",
        right: 10,
        bottom: 10,
        fontSize: 36
    }
});