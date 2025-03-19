import { supabase } from "../lib/supabase";
import { Buffer } from 'buffer';
import { deleteData, postData } from "./fetch";
import { useQueryClient } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { API_URL } from "@env";

export const uploadPhotoAndGetPublicUrl = async (image: string) => {
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
};

export const addOrDeleteToFavorites = async (userEmail: string, placeId: number, isDelete: boolean) => {
    const url = `${API_URL}/place/favorite`;
    try {
        if (isDelete) {
            await deleteData(`${url}?userEmail=${userEmail}&placeId=${placeId}`);
        } else {
            await postData(url, {
                userEmail,
                placeId
            });
        }
    queryClient.invalidateQueries({queryKey: ['place', 'detail', placeId]})
    } catch(error) {
        console.error("즐겨찾기 설정 에러", error);
    }
}