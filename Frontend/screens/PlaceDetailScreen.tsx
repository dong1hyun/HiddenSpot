import { RouteProp } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { HomeStackParamList, PostResponseType } from "../lib/type";
import { getData } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getRelativeTime } from "../util/date";
import StaticMap from "../components/molecules/StaticMap";
import Spinner from "../components/atoms/SpinLoading";
import AuthStore from "../store/AuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import EditButtons from "../components/molecules/EditButtons";
import PlaceDeleteModal from "../components/molecules/PlaceDeleteModal";
import LikeAndFavoriteButton from "../components/molecules/LikeAndFavoriteButton";
import { API_URL } from "@env";

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
type PlaceDetailScreenRouteProp = RouteProp<HomeStackParamList, "PlaceDetail">;

interface Props {
    route: PlaceDetailScreenRouteProp;
    navigation: PlaceDetailScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
export default function PlaceDetailScreen({ route }: Props) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { nickName, email } = AuthStore();
    const id = route.params.id;
    const fetchData = async (): Promise<PostResponseType> => {
        const response = await getData(`${API_URL}/place/${id}?email=${email}`);
        return response;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['place', 'detail', id],
        queryFn: fetchData,
        refetchInterval: 60000
    });
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {isLoading && <Spinner />}
                <Image source={{ uri: data?.photoUrl }} style={styles.image} resizeMode="cover" />
                <View style={styles.contentContainer}>
                    <View style={styles.uerContainer}>
                        <FontAwesome style={styles.userIcon} name="user-circle-o" />
                        <Text>{data?.nickName}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{data?.title}</Text>
                        <Text style={styles.time}>{getRelativeTime(data?.created_at.toString())}</Text>
                        <View style={styles.tags}>
                            {
                                data?.tags.map((tag) => (
                                    <Text key={tag}>#{tag}</Text>
                                ))
                            }
                        </View>
                        <Text style={styles.description}>{data?.description}</Text>
                        <Text>{data?.address}</Text>
                        <View style={styles.mapContainer}>
                            {
                                data &&
                                <StaticMap latitude={data.latitude} longitude={data.longitude} style={styles.map} />
                            }
                        </View>
                        <LikeAndFavoriteButton
                            email={email}
                            placeId={id}
                            isFavorited={!!data?.isFavorited}
                            isLiked={!!data?.isLiked}
                            favoriteCount={data?.favoriteCount || 0}
                            likeCount={data?.likeCount || 0}
                        />
                    </View>
                </View>
            </ScrollView>
            {
                nickName === data?.nickName &&
                <EditButtons data={data} setModalVisible={setModalVisible} />
            }
            <PlaceDeleteModal id={id} modalVisible={modalVisible} setDeleteLoading={setDeleteLoading} setModalVisible={setModalVisible} />
            <FullScreenLoader loading={deleteLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userIcon: {
        fontSize: 36,
    },
    uerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#dfe6e9",
        paddingBottom: 8,
        marginBottom: 12,
    },
    image: {
        height: width * 2 / 3,
        width: "100%",
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    infoContainer: {
        flex: 1,
    },
    tags: {
        flexDirection: "row",
        gap: 8,
        marginTop: 4
    },
    tag: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
    },
    time: {
        color: "gray",
        fontSize: 12
    },
    description: {
        paddingVertical: 24,
        fontSize: 18,
        lineHeight: 30
    },
    map: {
        width: "100%",
        height: "100%",
    },
    mapContainer: {
        width: "100%",
        height: height / 4,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#dfe6e9",
        overflow: 'hidden',
    },
});