import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getData } from "../util/fetch";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostResponseType, RootStackParamList } from "../lib/type";
import PlaceItem from "../components/molecules/PlaceItem";
import ScreenContainer from "../components/templates/ScreenContainer";
import { API_URL } from "@env";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;
interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
    const fetchData = async (): Promise<PostResponseType[]> => {
        const response = await getData(`${API_URL}/place`);
        return response;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['places'],
        queryFn: fetchData,
        refetchInterval: 5000
    });
    console.log(data);
    return (
            <ScreenContainer>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <PlaceItem placeData={item} />
                    )}
                    scrollEnabled={false}
                />
            </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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