import { StyleSheet } from "react-native";
import AccountInfo from "../components/molecules/AccountInfo";
import MyPageToPlacesLinks from "../components/molecules/MyPageToPlacesLinks";
import ScreenContainer from "../components/templates/ScreenContainer";
import Button from "../components/atoms/Button";
import { supabase } from "../lib/supabase";

export default function MyPageScreen() {
    return (
        <ScreenContainer style={styles.container}>
            <AccountInfo />
            <MyPageToPlacesLinks />
            <Button buttonStyle={styles.logout} onPress={() => supabase.auth.signOut()}>로그아웃</Button>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dfe6e9",
        gap: 12,
    },
    logout: {
        marginTop: 24,
    },
});