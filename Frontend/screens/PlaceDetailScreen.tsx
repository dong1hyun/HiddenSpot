import { RouteProp } from "@react-navigation/native";
import { Dimensions, Image, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { HomeStackParamList, PostResponseType } from "../lib/type";
import { getData } from "../util/fetch";
import { useQuery } from "@tanstack/react-query";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { getRelativeTime } from "../util/date";
import StaticMap from "../components/molecules/StaticMap";
import LoadingOverlay from "../components/atoms/Loading";

type PlaceDetailScreenProp = RouteProp<HomeStackParamList, "PlaceDetail">;
const { width, height } = Dimensions.get('window');
export default function PlaceDetailScreen({ route }: { route: PlaceDetailScreenProp }) {
    const id = route.params.id;
    const fetchData = async (): Promise<PostResponseType> => {
        const response = await getData(`http://10.0.2.2:5000/place/${id}`);

        return response;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['place', 'detail', id],
        queryFn: fetchData,
        refetchInterval: 60000
    });

    return (
        <ScrollView style={styles.container}>
            {isLoading && <LoadingOverlay />}
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
});