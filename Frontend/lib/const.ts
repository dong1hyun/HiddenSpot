export const tags = [
    "봄", "여름", "가을", "겨울", "산", "바다", "전통", "문화유산", "공원", "야경", "노을", "눈", "비", "자연", "도시", "예술", "감성", "기타"
];

interface MyPageLinkType {
    title: string;
    icon: string;
    type: "favorite" | "myPosts"
}

export const MyPageLinks: MyPageLinkType[] = [
    {
        title: "작성한 글",
        icon: "pencil-square",
        type: "myPosts",
    },
    {
        title: "찜한 장소",
        icon: "bookmark",
        type: "favorite"
    }
];

export const alt_image_url = "https://xyeyxqhiwfnytcpvwrxv.supabase.co/storage/v1/object/public/photos/public/alt_image.jpg";