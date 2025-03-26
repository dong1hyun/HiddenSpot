import { Text, View } from "react-native";
import ScreenContainer from "../components/templates/ScreenContainer";
import TagForm from "../components/molecules/TagForm";
import { useState } from "react";
import { TextInput } from "react-native";
import Error from "../components/atoms/Error";
import { StyleSheet } from "react-native";

export default function UserInfoSetting() {
    const [interests, setInterests] = useState<string[]>([]);
    const [nickName, setNickName] = useState("");
    const [nickNameError, setNickNameError] = useState("");
    const [interestsError, setInterestsError] = useState("");

    return (
        <ScreenContainer style={{marginTop: 50}}>
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