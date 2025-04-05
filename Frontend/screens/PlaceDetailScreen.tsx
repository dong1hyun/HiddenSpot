import { RouteProp } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { DetailPlaceType, HomeStackParamList } from "../lib/type";
import { getData } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { getRelativeTime } from "../util/date";
import StaticMap from "../components/molecules/StaticMap";
import AuthStore from "../store/AuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import EditButtons from "../components/molecules/EditButtons";
import PlaceDeleteModal from "../components/molecules/PlaceDeleteModal";
import LikeAndFavoriteButton from "../components/molecules/LikeAndFavoriteButton";
import { API_URL } from "@env";
import ModalContainer from "../components/templates/ModalContainer";
import ImageViewer from "react-native-image-zoom-viewer";
import { alt_image_url } from "../lib/const";
import TextCopyButton from "../components/atoms/TextCopyButton";
import ProfileImage from "../components/atoms/ProfileImage";
import PlaceDetailLoadingScreen from "../components/templates/PlaceDetailLoadingScreen";

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
type PlaceDetailScreenRouteProp = RouteProp<HomeStackParamList, "PlaceDetail">;

interface Props {
    route: PlaceDetailScreenRouteProp;
    navigation: PlaceDetailScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
export default function PlaceDetailScreen({ route, navigation }: Props) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const { nickName, email } = AuthStore();
    const id = route.params.id;
    const fetchData = async (): Promise<DetailPlaceType> => {
        const response = await getData(`${API_URL}/place/${id}?email=${email}`);
        return response;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['place', 'detail', id],
        queryFn: fetchData,
        refetchInterval: 30000
    });

    const onCloseImagePress = () => {
        setImageModalVisible(false);
    }
    return (
        <>
            {
                isLoading ? <PlaceDetailLoadingScreen /> :
                    <View style={styles.container}>
                        <ModalContainer modalVisible={imageModalVisible} setModalVisible={setImageModalVisible}>
                            <View style={styles.zoomImage}>
                                <EvilIcons style={styles.closeIcon} name="close" onPress={onCloseImagePress} />
                                <ImageViewer
                                    backgroundColor="transparent"
                                    imageUrls={[{ url: data?.photoUrl || alt_image_url }]}
                                    enableSwipeDown={true}
                                    onSwipeDown={onCloseImagePress}
                                />
                            </View>
                        </ModalContainer>
                        <ScrollView style={styles.container}>
                            <TouchableOpacity onPress={() => setImageModalVisible(true)}>
                                <Image
                                    source={{ uri: data?.photoUrl }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                            <View style={styles.contentContainer}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("UserInfo", {nickName: data?.user?.nickName || ""})}
                                    style={styles.uerContainer}
                                >
                                    <ProfileImage imageUrl={data?.user?.profileImageUrl} />
                                    <Text style={styles.nickName}>{data?.user?.nickName}</Text>
                                </TouchableOpacity>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.title}>{data?.title}</Text>
                                    <Text style={styles.time}>{getRelativeTime(data?.created_at.toString())}</Text>
                                    <View style={styles.tags}>
                                        {
                                            data?.tags.map((tag) => (
                                                <Text style={styles.tag} key={tag}>#{tag}</Text>
                                            ))
                                        }
                                    </View>
                                    <Text style={styles.description}>{data?.description}</Text>
                                    <View style={styles.addressContainer}>
                                        <Text>{data?.address}</Text>
                                        <TextCopyButton style={styles.copyButton} text={data?.address} />
                                    </View>
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
                            nickName === data?.user?.nickName &&
                            <EditButtons data={data} setModalVisible={setDeleteModalVisible} />
                        }
                        <PlaceDeleteModal id={id} modalVisible={deleteModalVisible} setDeleteLoading={setDeleteLoading} setModalVisible={setDeleteModalVisible} />
                        <FullScreenLoader loading={deleteLoading} />
                    </View>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nickName: {
        fontWeight: "bold",
        fontSize: 20,
    },
    userIcon: {
        fontSize: 36,
    },
    uerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
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
        fontFamily: "serif"
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
        fontSize: 12,
        lineHeight: 30
    },
    addressContainer: {
        flexDirection: "row",
        position: "relative",
        paddingRight: 40
    },
    copyButton: {
        position: "absolute",
        right: 0
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
        marginTop: 12,
        marginBottom: 50
    },
    zoomImage: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    closeIcon: {
        position: "absolute",
        color: "white",
        fontSize: 30,
        right: 10,
        top: 30,
        zIndex: 10,
        padding: 10
    }
});