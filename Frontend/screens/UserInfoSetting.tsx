import { Text, View } from "react-native";
import ScreenContainer from "../components/templates/ScreenContainer";
import TagForm from "../components/molecules/TagForm";
import { useState } from "react";
import { TextInput } from "react-native";
import Error from "../components/atoms/Error";
import { StyleSheet } from "react-native";
import Button from "../components/atoms/Button";
import { supabase } from "../lib/supabase";
import { postData } from "../util/fetch";
import AuthStore from "../store/AuthStore";
import { API_URL } from "@env";
import { checkNickNameExists } from "../util/user";

export default function UserInfoSetting() {
    const [loading, setLoading] = useState(false);
    const [interests, setInterests] = useState<string[]>([]);
    const [nickName, setNickName] = useState("");
    const [nickNameError, setNickNameError] = useState("");
    const [error, setError] = useState("");
    const [interestsError, setInterestsError] = useState("");
    const possible = interests.length > 0 && nickName
    const { email } = AuthStore();

    const handleSaveUserData = async () => {
        let isError = false;
        if (nickName.length < 2) {
            setNickNameError("닉네임은 2자 이상만 가능합니다");
            isError = true;
        } else if (nickName.length >= 11) {
            setNickNameError("닉네임은 10자까지만 가능합니다.");
            isError = true;
        }

        if (interests.length === 0) {
            setInterestsError("관심사 태그를 선택해주세요");
            isError = true;
        }
        if (isError) return;

        const {nickNameExist} = await checkNickNameExists(nickName);
        if(nickNameExist) {
            setNickNameError("이미 존재하는 닉네임입니다");
            return;
        }

        setLoading(true);
        
        const { error } = await supabase.auth.updateUser({
            data: { nickName, interests },
        });

        if (error) {
            console.error("유저 정보 업데이트 실패:", error.message);
            setError("유저 생성에 실패했습니다");
            setLoading(false);
            return;
        }

        await postData(`http://10.0.2.2:5000/user`, {
            email,
            nickName,
            interests
        });
        setLoading(false);
    };

    return (
        <ScreenContainer style={{ marginTop: 50 }}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
                style={styles.input}
                placeholder="닉네임을 입력해주세요"
                value={nickName}
                onChangeText={(text) => { setNickName(text) }}
                textAlignVertical="top"
                textAlign="left"
            />
            <Error message={nickNameError} />
            <TagForm
                setInterests={setInterests}
                interests={interests}
                errorMessage={interestsError}
                maxNumber={5}
                title='관심있는 태그를 선택해보세요'
            />
            <Error message={interestsError} />
            <Error message={error} />
            <Button buttonStyle={{ marginVertical: 12 }} onPress={handleSaveUserData} disabled={!possible}>완료</Button>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    toggleButton: {
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    label: {
        marginTop: 12,
        marginBottom: 5,
    },
    input: {
        borderColor: '#dfe6e9',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 8
    }
});