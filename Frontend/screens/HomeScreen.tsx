import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getData } from "../util/fetch";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostResponseType, RootStackParamList } from "../lib/type";
import PlaceItem from "../components/molecules/PlaceItem";
import ScreenContainer from "../components/templates/ScreenContainer";
import { ScrollView } from "react-native";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;
interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
    const fetchData = async (): Promise<PostResponseType[]> => {
        const response = await getData('http://10.0.2.2:5000/place');
        return response;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['places'],
        queryFn: fetchData,
        refetchInterval: 60000
    });

    return (
        <ScrollView>
            <ScreenContainer>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <PlaceItem placeData={item} />
                    )}
                    scrollEnabled={false}
                />
            </ScreenContainer>
        </ScrollView>
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