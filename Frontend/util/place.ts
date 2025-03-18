import { supabase } from "../lib/supabase";
import { deleteData } from "./fetch";
import { Buffer } from 'buffer';

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

export const deletePlace = async (id: number) => {
    try {
        deleteData(`http://10.0.2.2:5000/place/${id}`);
        
    } catch(error) {
        console.error("장소 제거 에러", error);
    }
};