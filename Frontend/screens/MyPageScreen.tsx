import { Pressable, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import AccountInfo from "../components/molecules/AccountInfo";
import ScreenContainer from "../components/templates/ScreenContainer";

export default function MyPageScreen() {
    return (
        <ScreenContainer style={{backgroundColor: "#dfe6e9"}}>
            <AccountInfo />
        </ScreenContainer>
    );
};