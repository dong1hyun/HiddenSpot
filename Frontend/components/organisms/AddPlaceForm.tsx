import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import InputWithLabel from "../atoms/InputWithLabel";
import * as ImagePicker from 'expo-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useForm } from "react-hook-form";
import { PostFormType, RootStackParamList } from "../../lib/type";
import Button from "../atoms/Button";
import Error from "../atoms/Error";
import { postData } from "../../util/fetch";
import AuthStore from "../../store/AuthStore";
import { supabase } from "../../lib/supabase";
import { Buffer } from 'buffer';
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_URL } from "@env";

interface Props {
    latitude: number;
    longitude: number;
    address: string;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
}

type AddPlaceScreenNavigation = StackNavigationProp<RootStackParamList, "HomeNavigator">;

export default function AddPlaceForm({ address, latitude, longitude, setIsLoading, isLoading }: Props) {
    const navigation = useNavigation<AddPlaceScreenNavigation>();
    const { control, formState: { errors }, handleSubmit, setValue, watch } = useForm<PostFormType>();
    const { nickName, email } = AuthStore();
    const image = watch("photoUrl");
    const title = watch("title");
    const description = watch("description");
    const queryClient = useQueryClient();
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const url = result.assets[0].uri;
            setValue("photoUrl", url);
        }
    };

    const uploadPhotoAndGetPublicUrl = async () => {
        try {
            // 이미지 url에서 데이터를 가져옴
            const response = await fetch(image);

            // 컨테츠 타입 추론
            const contentType = response.headers.get("content-type") || "application/octet-stream";

            // arrayBuffer(이진 데이터를 저장하는 고정 크기의 메모리 버퍼) 생성
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const { data, error } = await supabase.storage
                .from("photos")
                .upload(`public/${Date.now()}.png`, buffer, {
                    contentType: contentType,
                });

            if (error) {
                console.error(error);
                return;
            }
            else {
                const imageUrl = supabase.storage
                    .from('photos')
                    .getPublicUrl(data.path).data.publicUrl;
                return imageUrl;
            }
        } catch (error) {
            console.error("이미지 업로드 에러", error);
        }
    }

    const onSubmit = async (data: PostFormType) => {
        try {
            setIsLoading(true);
            const photoUrl = await uploadPhotoAndGetPublicUrl();
            await postData(`${API_URL}/place`, {
                userEmail: email,
                nickName,
                title: data.title,
                description: data.description,
                photoUrl,
                latitude,
                longitude,
                address
            });
            queryClient.invalidateQueries({ queryKey: ['places'] });
            navigation.reset({index: 0, routes: [{name: "HomeNavigator", params: {screen: "Home"}}]});
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.imageContainer, image && { borderWidth: 0 }, errors?.photoUrl?.message && { borderColor: "red" }]} onPress={pickImage}>
                {image ?
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" /> :
                    <EvilIcons name="camera" style={styles.camera} />
                }
            </TouchableOpacity>
            <InputWithLabel
                control={control}
                label="제목"
                name="title"
                placeHolder="제목을 입력해주세요."
                rules={{
                    required: "제목을 입력해주세요.",
                    maxLength: {
                        value: 15,
                        message: "제목은 최대 15자까지 입력할 수 있습니다."
                    }
                }}
            />
            <Error message={errors.title?.message} />
            <InputWithLabel
                control={control}
                label="사진과 장소에 대한 설명"
                name="description"
                placeHolder="내용을 입력해주세요."
                multiline={true}
                style={{ height: 120 }}
                rules={{
                    required: "내용을 입력해주세요.",
                    maxLength: {
                        value: 1000,
                        message: "설명은 최대 1000자까지 입력할 수 있습니다."
                    }
                }}
            />
            <Error message={errors.description?.message} />
            <Button
                style={styles.submitButton}
                color="white"
                disabled={!(title && description && image) || isLoading}
                onPress={handleSubmit(onSubmit)}
            >
                완료
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    camera: {
        fontSize: 200,
        color: "gray"
    },
    imageContainer: {
        width: "100%",
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "dashed",
        borderWidth: 2,
        borderRadius: 24,
        borderColor: "gray",
        marginVertical: 42,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
    },
    submitButton: {
        backgroundColor: "black",
        marginVertical: 20,
        paddingVertical: 10
    }
});