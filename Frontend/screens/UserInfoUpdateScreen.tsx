import { Image, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/templates/ScreenContainer";
import { StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Error from "../components/atoms/Error";
import { useForm } from "react-hook-form";
import AuthStore from "../store/AuthStore";
import { MyPageStackParamList, UserInfoFormType } from "../lib/type";
import InputWithLabel from "../components/atoms/InputWithLabel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import TagForm from "../components/molecules/TagForm";
import { useState } from "react";
import Button from "../components/atoms/Button";
import { uploadPhotoAndGetPublicUrl } from "../util/place";
import { supabase } from "../lib/supabase";
import { updateData } from "../util/fetch";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";


type MyPageNavigationProp = StackNavigationProp<MyPageStackParamList, "UserInfoUpdate">;
export default function UserInfoUpdateScreen() {
    const navigation = useNavigation<MyPageNavigationProp>();
    const { nickName, email, interests, profileImageUrl } = AuthStore();
    const [newInterests, setNewInterests] = useState(interests);
    const [isLoading, setIsLoading] = useState(false);
    const { control, formState: { errors }, handleSubmit, setValue, watch } = useForm<UserInfoFormType>({
        defaultValues: {
            nickName,
            interests,
            profileImageUrl
        }
    });
    const image = watch("profileImageUrl");
    const newNickName = watch("nickName");
    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const photoUrl = await uploadPhotoAndGetPublicUrl(image);

            const userData = {
                nickName: newNickName,
                interests: newInterests,
                profileImageUrl: photoUrl
            }
            supabase.auth.updateUser({
                data: userData
            });

            await updateData(`http://10.0.2.2:5000/user/${email}`, userData);
            setIsLoading(false);
            navigation.navigate("MyPage");
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const url = result.assets[0].uri;
            setValue("profileImageUrl", url);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <ScreenContainer style={{ paddingTop: 40 }}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        {
                            image ?
                                <Image style={styles.image} source={{ uri: image }} /> :
                                <>
                                    <FontAwesome style={styles.userIcon} name="smile-o" />
                                    <Entypo style={styles.cameraIcon} name="camera" />
                                </>
                        }
                    </TouchableOpacity>
                </View>
                <InputWithLabel
                    control={control}
                    label="닉네임"
                    name="nickName"
                    placeHolder="닉네임을 입력해주세요"
                    rules={{
                        required: "닉네임을 입력해주세요",
                        minLength: {
                            value: 2,
                            message: "닉네임은 2자 이상만 입력할 수 있습니다"
                        },
                        maxLength: {
                            value: 10,
                            message: "닉네임은 최대 10자까지만 입력할 수 있습니다"
                        }
                    }}
                />
                <Error message={errors.nickName?.message} />
                <TagForm
                    interests={newInterests}
                    setInterests={setNewInterests}
                    errorMessage=""
                    title="관심있는 태그를 선택해보세요"
                    maxNumber={5}
                />
                <Error message={errors.nickName?.message} />
                <Button disabled={!(newNickName && newInterests.length > 0)} onPress={handleSubmit(onSubmit)}>수정완료</Button>
            </ScreenContainer>
            <FullScreenLoader loading={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    imageButton: {
        position: "relative",
    },
    userIcon: {
        fontSize: 120,
        color: "#b2bec3"
    },
    cameraIcon: {
        position: "absolute",
        fontSize: 24,
        bottom: 5,
        right: 5
    }
});