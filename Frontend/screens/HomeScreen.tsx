import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const data = [
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    }
]

export default function HomeScreen() {
    
    return (
        <View>
            <FlatList 
                data={data}
                renderItem={({item}) => (
                    <View>
                        <Text>
                            {item.title}
                        </Text>
                        <Image style={styles.image} source={{uri: item.image}} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    }
});