import { RouteProp } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { HomeStackParamList, MapStackParamList, PostResponseType, RootStackParamList } from "../lib/type";
import { getData } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { getRelativeTime } from "../util/date";
import StaticMap from "../components/molecules/StaticMap";
import Spinner from "../components/atoms/SpinLoading";
import { API_URL } from "@env";
import AuthStore from "../store/AuthStore";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import Button from "../components/atoms/Button";

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
type PlaceDetailScreenRouteProp = RouteProp<HomeStackParamList, "PlaceDetail">;

interface Props {
    route: PlaceDetailScreenRouteProp;
    navigation: PlaceDetailScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');
export default function PlaceDetailScreen({ route, navigation }: Props) {
    const { nickName } = AuthStore();
    const id = route.params.id;
    const fetchData = async (): Promise<PostResponseType> => {
        const response = await getData(`${API_URL}/place/${id}`);

        return response;
    }

    const { data, error, isLoading } = useQuery({
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
                        <FontAwesome6Icon style={styles.userIcon} name="circle-user" />
                        <Text>{data?.nickName}</Text>
                    </View>
                    <Text style={styles.title}>{data?.title}</Text>
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
                <View style={styles.editButtonContainer}>
                    <Button
                        buttonStyle={[styles.button, { backgroundColor: "#74b9ff" }]}
                        textStyle={styles.buttonText}
                        onPress={() => navigation.navigate("AddPlace", {
                            id: data.id,
                            address: data.address,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            title: data.title,
                            description: data.description,
                            photoUrl: data.photoUrl,
                        })}
                    >
                        수정
                    </Button>
                    <Button
                        buttonStyle={[styles.button, { backgroundColor: "red" }]}
                        textStyle={styles.buttonText}
                        onPress={() => { }}
                    >
                        삭제
                    </Button>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userIcon: {
        fontSize: 36,
        color: "gray"
    },
    uerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#dfe6e9",
        paddingBottom: 12,
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
    editButtonContainer: {
        position: 'absolute', // 화면 고정
        bottom: 10, // 하단에 고정
        left: 0,
        right: 0,
        padding: 10,
        alignItems: 'center',
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 12
    },
    button: {
        backgroundColor: "black",
        paddingHorizontal: 24,
        paddingVertical: 4,
        borderRadius: 8
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
});