import { ScrollView, StyleSheet, Text, View } from "react-native";
import { tags } from "../../lib/const";
import { Dispatch, SetStateAction } from "react";

interface Props {
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

export default function TagFilter({ selectedTags, setSelectedTags }: Props) {
    const onTagPress = (tag: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedTags(prev => {
                const arr = [...prev];
                return arr.filter((prev_tag) => prev_tag !== tag);
            });
        } else {
            setSelectedTags(prev => [...prev, tag]);
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            >
                {
                    tags.map((tag) => {
                        const isSelected = selectedTags.some((sel_tag) => sel_tag === tag);
                        return (
                            <Text
                                style={isSelected ? styles.selectedTag : styles.tag}
                                key={tag}
                                onPress={() => onTagPress(tag, isSelected)}
                            >
                                {tag}
                            </Text>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    tag: {
        backgroundColor: "#9dceff",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        color: "white"
    },
    selectedTag: {
        backgroundColor: "#9dceff",
        opacity: 0.5,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        color: "white"
    }
});