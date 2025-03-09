import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { AuthStackParamList, RegisterFormType, UserType } from '../lib/type';
import { useState } from 'react';
import InputWithLabel from '../components/atoms/InputWithLabel';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import Error from '../components/atoms/Error';
import ScreenContainer from '../components/templates/ScreenContainer';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoadingOverlay from '../components/atoms/Loading';
import { useMutation } from '@tanstack/react-query';
import { postData } from '../util/fetch';
import { StackNavigationProp } from '@react-navigation/stack';

const user = {"app_metadata": {"provider": "email", "providers": ["email"]}, "aud": "authenticated", "created_at": "2025-03-04T12:21:45.822379Z", "email": "limd1238@gmail.com", "email_confirmed_at": "2025-03-04T12:21:45.832493296Z", "id": "7bf35d44-6e2d-4d6c-bcd8-60d1637b817d", "identities": [{"created_at": "2025-03-04T12:21:45.828315Z", "email": "limd1238@gmail.com", "id": "7bf35d44-6e2d-4d6c-bcd8-60d1637b817d", "identity_data": [Object], "identity_id": "79419f95-23a7-4a2a-8a54-2cf0ff162a3e", "last_sign_in_at": "2025-03-04T12:21:45.828260594Z", "provider": "email", "updated_at": "2025-03-04T12:21:45.828315Z", "user_id": "7bf35d44-6e2d-4d6c-bcd8-60d1637b817d"}], "is_anonymous": false, "last_sign_in_at": "2025-03-04T12:21:45.836110984Z", "phone": "", "role": "authenticated", "updated_at": "2025-03-04T12:21:45.838129Z", "user_metadata": {"email": "limd1238@gmail.com", "email_verified": true, "nickName": "dsfa", "phone_verified": false, "sub": "7bf35d44-6e2d-4d6c-bcd8-60d1637b817d"}}
user.user_metadata.nickName
user.email
export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormType>();
    const [loading, setLoading] = useState(false);
    const {mutate} = useMutation({
        mutationFn: ({email, nickName}: UserType) => postData("http://10.0.2.2:5000/user", {email, nickName}), 
        onError: (error) => {
            console.error(error);
        },
        onSettled() {
            setLoading(false);
        },
    });
    async function signUpAndCreateUser({ email, password, nickName }: RegisterFormType) {
        setLoading(true);
        const {
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    nickName
                }
            }
        });
        if (error) Alert.alert(error.message);
        mutate({email, nickName});
    }
    const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
        signUpAndCreateUser({
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            nickName: data.nickName
        });
    }
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
            <Pressable style={sytles.toggleButton} onPress={() => { navigation.navigate("Login") }}><Text>로그인</Text></Pressable>
            <Button onPress={handleSubmit(onSubmit)}>계정생성</Button>
            {loading && <LoadingOverlay />}
        </ScreenContainer>
    );
};

const sytles = StyleSheet.create({
    container: {

    },
    toggleButton: {
        marginVertical: 20,
        color: "#7f8c8d",
    }
});