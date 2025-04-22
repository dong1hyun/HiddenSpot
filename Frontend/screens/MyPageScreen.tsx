import { StyleSheet } from "react-native";
import AccountInfo from "../components/molecules/AccountInfo";
import MyPageToPlacesLinks from "../components/molecules/MyPageToPlacesLinks";
import ScreenContainer from "../components/templates/ScreenContainer";
import Button from "../components/atoms/Button";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import DoubleCheckModal from "../components/molecules/DoubleCheckModal";

export default function MyPageScreen() {
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const onLogoutPress = () => {
        try {
            setIsLogoutLoading(true);
            supabase.auth.signOut();
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLogoutLoading(false);
        }
    }
    return (
        <ScreenContainer style={styles.container}>
            <AccountInfo />
            <MyPageToPlacesLinks />
            <Button buttonStyle={styles.logout} onPress={() => setIsLogoutModalVisible(true)}>로그아웃</Button>
            <DoubleCheckModal 
                notification="정말 로그아웃 하시겠습니까?"
                buttonText="확인"
                execute={onLogoutPress}
                modalVisible={isLogoutModalVisible}
                setModalVisible={setIsLogoutModalVisible}
            />
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