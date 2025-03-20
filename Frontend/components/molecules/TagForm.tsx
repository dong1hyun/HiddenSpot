import { Alert, StyleSheet, Text, View } from "react-native";
import { tags } from "../../lib/const";
import Button from "../atoms/Button";
import { Dispatch, SetStateAction } from "react";
import Error from "../atoms/Error";

interface Props {
    interests: string[];
    setInterests: Dispatch<SetStateAction<string[]>>;
    errorMessage: string | undefined;
    maxNumber: number;
    title: string;
}

export default function TagForm({ setInterests, interests, errorMessage, title, maxNumber }: Props) {
    const onTagPress = (tag: string) => {
        const isDuplication = interests.some((prevTag) => prevTag === tag);
        if (isDuplication) return;
        if (interests.length === maxNumber) {
            Alert.alert("알림", `태그는 최대 ${maxNumber}개까지만 선택할 수 있어요!`);
            return;
        }
        setInterests(prev => [...prev, tag]);
    }
    const onTagDeletePress = (tag: string) => {
        setInterests(prev => prev.filter((prevTag) => prevTag !== tag));
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`${title} (최대 ${maxNumber}개)`}</Text>
            <View style={styles.tagContainer}>
                {
                    tags.map((tag, index) => {
                        return (
                            <Button buttonStyle={styles.tag} key={index} onPress={() => { onTagPress(tag) }} textStyle={styles.text}>{tag}</Button>
                        )
                    })
                }
            </View>
            <View style={styles.seletedTagContainer}>
                {
                    interests.map((interest, index) => (
                            <Text style={styles.selectedTag} onPress={() => { onTagDeletePress(interest) }} key={index}>{interest}</Text>
                    ))
                }
            </View>
            <Error message={errorMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 32
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 12,
    },
    tag: {
        backgroundColor: "#636e72"
    },
    tagContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        padding: 10,
        gap: 12
    },
    selectedTag: {
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 8,
        fontWeight: "500"
    },
    text: {
        fontSize: 24,
        fontWeight: "500"
    },
    seletedTagContainer: {
        width: "100%",
        backgroundColor: "#dfe6e9",
        flexDirection: "row",
        gap: 10,
        padding: 8,
        borderRadius: 12,
        minHeight: 36,
    }
});