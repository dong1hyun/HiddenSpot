import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { getData } from "../util/fetch";

export default function HomeScreen() {
    const fetchData = async () => {
        const response = await getData('http://10.0.2.2:5000/place');
        return response;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['places'],
        queryFn: fetchData
    })

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    }
});