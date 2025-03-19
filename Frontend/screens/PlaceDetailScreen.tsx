import { RouteProp } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { HomeStackParamList, PostResponseType } from "../lib/type";
import { deleteData, getData } from "../util/fetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getRelativeTime } from "../util/date";
import StaticMap from "../components/molecules/StaticMap";
import Spinner from "../components/atoms/SpinLoading";
import { API_URL } from "@env";
import AuthStore from "../store/AuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../components/atoms/Button";
import { useState } from "react";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import ModalContainer from "../components/templates/ModalContainer";
import { addOrDeleteToFavorites } from "../util/place";
import EditButtons from "../components/molecules/EditButtons";

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
type PlaceDetailScreenRouteProp = RouteProp<HomeStackParamList, "PlaceDetail">;

interface Props {
    route: PlaceDetailScreenRouteProp;
    navigation: PlaceDetailScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
export default function PlaceDetailScreen({ route, navigation }: Props) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { nickName, email } = AuthStore();
    const id = route.params.id;
    const queryClient = useQueryClient();
    const fetchData = async (): Promise<PostResponseType> => {
        const response = await getData(`http://10.0.2.2:5000/place/${id}?email=${email}`);
        return response;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['place', 'detail', id],
        queryFn: fetchData,
        refetchInterval: 60000
    });

    const deletePlace = async () => {
        try {
            setDeleteLoading(true);
            await deleteData(`${API_URL}/place/${id}`);
            setModalVisible(false);
            queryClient.invalidateQueries({queryKey: ['places']});
            navigation.navigate("Home");
        } catch(error) {
            console.error("장소 제거 에러", error);
        } finally {
            setDeleteLoading(false);
        }
    };
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.title}>{data?.title}</Text>
                        <AntDesign onPress={() => {addOrDeleteToFavorites(email, +id, !!data?.favoritedBy)}} name={data?.favoritedBy ? "star" : "staro"} style={styles.starIcon} />
                    </View>
                    <Text style={styles.time}>{getRelativeTime(data?.created_at.toString())}</Text>
                    <Text style={styles.description}>{data?.description}</Text>
                    <Text>{data?.address}</Text>
                    <View style={styles.mapContainer}>
                        {
                            data &&
                            <StaticMap latitude={data.latitude} longitude={data.longitude} style={styles.map} />
                        }
                    </View>
                </View>
            </ScrollView>
            {
                nickName === data?.nickName &&
                <EditButtons data={data} setModalVisible={setModalVisible} />
            }
            <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <View style={styles.modalContainer}>
                    <Text>정말 삭제하시겠습니까?</Text>
                    <View style={styles.buttons}>
                        <Button buttonStyle={styles.button} onPress={() => setModalVisible(false)}>취소</Button>
                        <Button buttonStyle={styles.button} onPress={() => {deletePlace()}}>확인</Button>
                    </View>
                </View>
            </ModalContainer>
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
    modalContainer: {
        backgroundColor: "white",
        gap: 12,
        padding: 32,
        borderRadius: 24,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 32,
    },
    button: {
        paddingHorizontal: 12
    },
    starIcon: {
        fontSize: 28,
        color: "#fdcb6e"
    }
});