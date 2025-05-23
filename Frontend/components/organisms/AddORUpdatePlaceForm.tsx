import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import InputWithLabel from "../atoms/InputWithLabel";
import * as ImagePicker from 'expo-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useForm } from "react-hook-form";
import { HomeStackParamList, PostFormType } from "../../lib/type";
import Button from "../atoms/Button";
import Error from "../atoms/Error";
import { postData, updateData } from "../../util/fetch";
import AuthStore from "../../store/AuthStore";
import { Dispatch, SetStateAction, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_URL } from "@env";
import { uploadPhotoAndGetPublicUrl } from "../../util/place";
import queryClient from "../../util/queryClient";
import TagForm from "../molecules/TagForm";

interface Props {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
}

type AddPlaceScreenNavigation = StackNavigationProp<HomeStackParamList, "PlaceDetail">;
type AddPlaceRouteProp = RouteProp<HomeStackParamList, "AddPlace">;

export default function AddOrUpdatePlaceForm({ setIsLoading, isLoading }: Props) {
    const navigation = useNavigation<AddPlaceScreenNavigation>();
    const route = useRoute<AddPlaceRouteProp>();
    const prevData = route.params;
    const { address, latitude, longitude, tags } = prevData;
    const [interests, setInterests] = useState<string[]>(tags || []);
    const isEditing = Boolean(prevData.id);
    const { control, formState: { errors }, handleSubmit, setValue, watch } = useForm<PostFormType>(prevData.title ? {
        defaultValues: {
            title: prevData.title,
            description: prevData.description,
            photoUrl: prevData.photoUrl,

        }
    } : {});
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

    const onSubmit = async (data: PostFormType) => {
        try {
            setIsLoading(true);
            const photoUrl = await uploadPhotoAndGetPublicUrl(image);
            const PlaceData = {
                userEmail: email,
                title: data.title,
                description: data.description,
                photoUrl,
                latitude,
                longitude,
                address,
                tags: interests
            }
            let id = prevData.id;
            if (isEditing) {
                await updateData(`${API_URL}/place/${id}`, PlaceData);
            }
            else {
                const response = await postData(`${API_URL}/place`, PlaceData);
                id = response.id;
            }
            queryClient.invalidateQueries({ queryKey: ['places'] });
            if (id) {
                navigation.navigate("PlaceDetail", {
                    id
                });
            }
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
                placeHolder="제목을 입력해주세요"
                rules={{
                    required: "제목을 입력해주세요",
                    maxLength: {
                        value: 15,
                        message: "제목은 최대 15자까지 입력할 수 있습니다"
                    }
                }}
            />
            <Error message={errors.title?.message} />
            <InputWithLabel
                control={control}
                label="사진과 장소에 대한 설명"
                name="description"
                placeHolder="내용을 입력해주세요"
                multiline={true}
                style={{ height: 120 }}
                rules={{
                    required: "내용을 입력해주세요",
                    maxLength: {
                        value: 1000,
                        message: "설명은 최대 1000자까지 입력할 수 있습니다"
                    }
                }}
            />
            <Error message={errors.description?.message} />
            <TagForm
                interests={interests}
                setInterests={setInterests}
                errorMessage=""
                title="사진에 해당하는 태그를 선택해주새요"
                maxNumber={2}
            />
            <Button
                buttonStyle={styles.submitButton}
                textStyle={{ color: "white" }}
                disabled={!(title && description && image && interests.length) || isLoading}
                onPress={handleSubmit(onSubmit)}
            >
                {isEditing ? "수정 완료" : "완료"}
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
        borderColor: "#b2bec3",
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