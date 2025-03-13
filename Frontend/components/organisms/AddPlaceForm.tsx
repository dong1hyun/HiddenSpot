import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import InputWithLabel from "../atoms/InputWithLabel";
import * as ImagePicker from 'expo-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useForm } from "react-hook-form";
import { PostFormType } from "../../lib/type";
import Button from "../atoms/Button";
import Error from "../atoms/Error";
import { postData } from "../../util/fetch";
import AuthStore from "../../store/AuthStore";
import { supabase } from "../../lib/supabase";
import { Buffer } from 'buffer';
import { useState } from "react";

interface Props {
    latitude: number;
    longitude: number;
    address: string;
}

export default function AddPlaceForm({ address, latitude, longitude }: Props) {
    const { control, formState: { errors }, handleSubmit, setValue, watch } = useForm<PostFormType>();
    const [isLoading, setIsLoading] = useState(false);
    const { email } = AuthStore();
    const image = watch("photoUrl");
    const title = watch("title");
    const description = watch("description");

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
            postData("http://10.0.2.2:5000/place", {
                userEmail: email,
                title: data.title,
                description: data.description,
                photoUrl,
                latitude,
                longitude,
                address
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
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
                        value: 20,
                        message: "제목은 최대 20자까지 입력할 수 있습니다."
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
                        value: 500,
                        message: "설명은 최대 500자까지 입력할 수 있습니다."
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
        marginTop: 36
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