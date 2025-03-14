import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getData } from "../util/fetch";
import { StackNavigationProp } from "@react-navigation/stack";
import {  RootStackParamList } from "../lib/type";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;
interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({navigation}: Props) {
    const fetchData = async () => {
        const response = await getData('http://10.0.2.2:5000/place');
        return response;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['places'],
        queryFn: fetchData,
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <Image style={styles.image} source={{ uri: item.photoUrl }} />
                        <Text>
                            {item.title}
                        </Text>
                        <Text>
                            {item.description}
                        </Text>
                    </View>
                )}
            />
        </View>
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