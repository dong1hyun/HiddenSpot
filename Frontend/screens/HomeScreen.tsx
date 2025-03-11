import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import { getData } from "../util/fetch";
import AntDesign from "react-native-vector-icons/AntDesign"
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList, RootStackParamList } from "../lib/type";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;
interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({navigation}: Props) {
    const fetchData = async () => {
        const response = await getData('http://10.0.2.2:5000/place');
        return response;
    };

    // const { data, error, isLoading } = useQuery({
    //     queryKey: ['places'],
    //     queryFn: fetchData
    // })

    const data:any = []
    return (
        <View style={styles.container}>
            <Pressable onPress={() => supabase.auth.signOut()}><Text>로그아웃</Text></Pressable>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            {item.title}
                        </Text>
                        <Image style={styles.image} source={{ uri: item.image }} />
                    </View>
                )}
            />
            <TouchableOpacity onPress={() => navigation.navigate("MapNavigator", {screen: "AddPlace"})}>
                <AntDesign style={styles.plusIcon} name="pluscircleo" />
            </TouchableOpacity>
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