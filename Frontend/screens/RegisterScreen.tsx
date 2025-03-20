import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { AuthStackParamList, RegisterFormType, UserType } from '../lib/type';
import { useEffect, useState } from 'react';
import InputWithLabel from '../components/atoms/InputWithLabel';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import Error from '../components/atoms/Error';
import ScreenContainer from '../components/templates/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import Spinner from '../components/atoms/SpinLoading';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../util/fetch';
import { StackNavigationProp } from '@react-navigation/stack';
import { checkUserExists } from '../util/user';
import { API_URL } from '@env';
import TagForm from '../components/molecules/TagForm';
import AntDesign from "react-native-vector-icons/AntDesign";

export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const { control, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm<RegisterFormType>();
    const [loading, setLoading] = useState(false);
    const [interests, setInterests] = useState<string[]>([]);
    const { mutate } = useMutation({
        mutationFn: ({ email, nickName, interests }: UserType) => postData(`${API_URL}/user`, { email, nickName, interests }),
        onError: (error) => {
            console.error("error:", error);
        },
    });
    async function signUpAndCreateUser({ email, password, nickName, interests, }: RegisterFormType) {
        try {
            setLoading(true);
            if(interests.length === 0) {
                setError("interests", {message: "관심사를 최소 1개 이상 선택해주세요"});
                return;
            }
            const existCheck = await checkUserExists(email, nickName);
            let exist = false;
            if (existCheck.emailExist) {
                setError("email", { message: "이미 존재하는 이메일입니다" });
                exist = true;
            }
            if (existCheck.nickNameExist) {
                setError("nickName", { message: "이미 존재하는 닉네임입니다" });
                exist = true;
            }
            if (exist) {
                return;
            }

            mutate({ email, nickName, interests });
            const {
                error,
            } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        nickName,
                        interests
                    }
                }
            });
            if (error) Alert.alert(error.message);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
        signUpAndCreateUser({
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            nickName: data.nickName,
            interests
        });
    }
    useEffect(() => {
        if (interests.length > 0) {
          clearErrors("interests");
        }
      }, [interests]);
    return (
        <ScreenContainer>
            <InputWithLabel
                control={control}
                name='email'
                label='이메일'
                placeHolder="Email@example.com"
                invisible={false}
                rules={{
                    required: "이메일을 입력해주세요",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "유효한 이메일 형식이 아닙니다"
                    }
                }}
            />
            <Error message={errors.email?.message} />
            <InputWithLabel
                control={control}
                name='password'
                label='비밀번호'
                placeHolder='Password'
                invisible={true}
                rules={{
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                        value: 6,
                        message: "최소 6자 이상의 비밀번호가 필요합니다"
                    },
                    maxLength: {
                        value: 14,
                        message: "비밀번호는 최대 14자까지만 가능합니다"
                    }
                }}
            />
            <Error message={errors.password?.message} />
            <InputWithLabel
                control={control}
                name='confirm_password'
                label='비밀번호 확인'
                placeHolder='Confirm Password'
                invisible={true}
                rules={{
                    validate: (value) => value === watch("password") || "비밀번호와 일치하지 않습니다"
                }}
            />
            <Error message={errors.confirm_password?.message} />
            <InputWithLabel
                control={control}
                name='nickName'
                label='닉네임'
                placeHolder='NickName'
                invisible={false}
                rules={{
                    required: "닉네임을 입력해주세요",
                    minLength: {
                        value: 2,
                        message: "최소 2자 이상의 닉네임이이 필요합니다"
                    },
                    maxLength: {
                        value: 14,
                        message: "닉네임은 최대 10자까지만 가능합니다"
                    }
                }}
            />
            <Error message={errors.nickName?.message} />
            <TagForm
                setInterests={setInterests}
                interests={interests}
                errorMessage={errors.interests?.message}
                maxNumber={5}
                title='관심있는 태그를 선택해보세요'
            />
            <Pressable style={styles.toggleButton} onPress={() => { navigation.navigate("Login") }}><Text style={styles.link}>로그인</Text><AntDesign name='arrowright' /></Pressable>
            <Button onPress={handleSubmit(onSubmit)}>계정생성</Button>
            {loading && <Spinner />}
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        marginVertical: 20,
        color: "#7f8c8d",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    link: {
      color: "#7f8c8d",
    }
});