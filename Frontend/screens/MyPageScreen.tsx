import { Pressable, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function MyPageScreen() {
    return (
        <View>
            <Text>마이페이지</Text>
            <Pressable onPress={() => supabase.auth.signOut()}><Text>로그아웃</Text></Pressable>

        </View>
    );
};