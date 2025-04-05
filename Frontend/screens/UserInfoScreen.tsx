import { useInfiniteQuery } from "@tanstack/react-query";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getData } from "../util/fetch";
import { RouteProp } from "@react-navigation/native";
import { HomePlaceType, HomeStackParamList, PostResponseType, UserInfoFormType } from "../lib/type";
import HomePlaceItem from "../components/molecules/HomePlaceItem";
import Spinner from "../components/atoms/SpinLoading";
import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { API_URL } from "@env";

type PlaceDetailScreenRouteProp = RouteProp<HomeStackParamList, "UserInfo">;

export default function UserInfoScreen({ route }: { route: PlaceDetailScreenRouteProp }) {
    const { nickName } = route.params;
    const [user, setUser] = useState<UserInfoFormType>();
    const fetchData = async (pageParam: number): Promise<HomePlaceType[]> => {
        const response = await getData(`${API_URL}/place/myPosts?nickName=${nickName}&page=${pageParam}`);
        return response;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['places', 'user', nickName],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined;
        },
        refetchInterval: 30000
    });

    const getUserData = async () => {
        const userData = await getData(`${API_URL}/user/${nickName}`);
        setUser(userData);
    };
    useEffect(() => {
        getUserData();
    }, [nickName])
    const places = data?.pages.flat();
    const onEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {
                    user?.profileImageUrl ?
                        <Image style={styles.image} source={{ uri: user?.profileImageUrl }} /> :
                        <FontAwesome style={styles.icon} name="user-circle-o" />
                }
                <View style={styles.tags}>
                    {
                        user?.interests.map((tag) => (
                            <Text key={tag}>
                                #{tag}
                            </Text>
                        ))
                    }
                </View>
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
            <View style={styles.placesContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    placesContainer: {
        flex: 1,
    },
    profile: {
        alignItems: "center",
        gap: 5,
        marginVertical: 25,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 300,
    },
    icon: {
        fontSize: 200,
        color: "#dfe6e9"
    },
    nickName: {
        fontSize: 24
    },
    tags: {
        flexDirection: "row",
        gap: 5
    }
});