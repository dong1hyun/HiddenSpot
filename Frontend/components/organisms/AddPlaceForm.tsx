import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import InputWithLabel from "../atoms/InputWithLabel";
import * as ImagePicker from 'expo-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useForm } from "react-hook-form";
import { PostFormType } from "../../lib/type";
import Button from "../atoms/Button";
import Error from "../atoms/Error";

export default function AddPlaceForm() {
    const { control, formState: { errors }, handleSubmit, setValue, watch } = useForm<PostFormType>();
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

    const onSubmit = (data: PostFormType) => {
        console.log(data);
    };

    return (
        <View>
            <TouchableOpacity style={[styles.imageContainer, image && { borderWidth: 0 }, errors?.photoUrl?.message && {borderColor: "red"}]} onPress={pickImage}>
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
                disabled={!(title && description && image)}
                onPress={handleSubmit(onSubmit)}
            >
                완료
            </Button>
        </View>
    )
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