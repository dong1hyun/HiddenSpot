import { supabase } from "../lib/supabase";
import { Buffer } from 'buffer';
import { deleteData, postData } from "./fetch";
import { useMutation } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { API_URL } from "@env";
import { PostResponseType } from "../lib/type";

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

export const useFavoriteMutation = (userEmail: string, placeId: number, isFavorited: boolean) => {
    return useMutation({
        mutationFn: async () => {
            const url = `${API_URL}/place/favorite`;

            if (isFavorited) {
                await deleteData(`${url}?userEmail=${userEmail}&placeId=${placeId}`);
            } else {
                await postData(url, {
                    userEmail,
                    placeId
                });
            }
        },

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["place", "detail", placeId] });

            const previousData = queryClient.getQueryData(["place", "detail", placeId]);

            queryClient.setQueryData(["place", "detail", placeId], (oldData: PostResponseType) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    isFavorited: !oldData.isFavorited,
                    favoriteCount: oldData.isFavorited ? oldData.favoriteCount - 1 : oldData.favoriteCount + 1
                };
            });

            return { previousData };
        },

        onError: (error, _, context) => {
            console.error("즐겨찾기 요청 오류:", error);
            if (context?.previousData) {
                queryClient.setQueryData(["place", "detail", placeId], context.previousData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["place", "detail", placeId] });
            queryClient.invalidateQueries({ queryKey: ["places"] });
            queryClient.invalidateQueries({ queryKey: ["recommendationPlaces"] });
        },
    });
};

export const useLikeMutation = (userEmail: string, placeId: number, isLiked: boolean) => {
    return useMutation({
        mutationFn: async () => {
            const url = `${API_URL}/place/like`;

            if (isLiked) {
                await deleteData(`${url}?userEmail=${userEmail}&placeId=${placeId}`);
            } else {
                await postData(url, {
                    userEmail,
                    placeId
                });
            }
        },

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["place", "detail", placeId] });

            const previousData = queryClient.getQueryData(["place", "detail", placeId]);

            queryClient.setQueryData(["place", "detail", placeId], (oldData: PostResponseType) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    isLiked: !oldData.isLiked,
                    likeCount: oldData.isLiked ? oldData.likeCount - 1 : oldData.likeCount + 1
                };
            });

            return { previousData };
        },

        onError: (error, _, context) => {
            console.error("좋아요 요청 오류:", error);
            if (context?.previousData) {
                queryClient.setQueryData(["place", "detail", placeId], context.previousData);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["place", "detail", placeId] });
            queryClient.invalidateQueries({ queryKey: ["places"] });
            queryClient.invalidateQueries({ queryKey: ["recommendationPlaces"] });
        },
    });
};