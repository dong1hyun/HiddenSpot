import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getData } from "../util/fetch";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostResponseType, RootStackParamList } from "../lib/type";
import HomePlaceItem from "../components/molecules/HomePlaceItem";
import { API_URL } from "@env";
import TagFilter from "../components/molecules/TagFilter";
import Spinner from "../components/atoms/SpinLoading";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;
interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const fetchData = async (pageParam: number): Promise<PostResponseType[]> => {
        const tagQuery = selectedTags.length > 0 ? `&tags=${selectedTags.join(',')}` : "";
        const response = await getData(`${API_URL}/place?page=${pageParam}${tagQuery}`);
        return response;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['places', selectedTags],
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
            <TagFilter selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            <FlatList
                data={places}
                renderItem={({ item }) => (
                    <HomePlaceItem placeData={item} />
                )}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
            />
            <Spinner isLoading={isLoading} />
        </View>
    );
};

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