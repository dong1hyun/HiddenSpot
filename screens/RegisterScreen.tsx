import { Alert, Pressable, Text, View } from 'react-native'
import AuthForm from '../components/molecules/AuthForm'
import { supabase } from '../lib/supabase'
import { AuthStackParamList, RegisterFormType } from '../lib/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import InputWithLabel from '../components/atoms/InputWithLabel';
import Button from '../components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormType>();
    const [loading, setLoading] = useState(false);
    async function signUpWithEmail({ email, password, confirm_password, nickName }: RegisterFormType) {
        setLoading(true);
        const {
            data: { session },
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

        if (error) Alert.alert(error.message)
        // else if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false);
    }
    const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
        signUpWithEmail({
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            nickName: data.nickName
        });
    }
    console.log(errors);
    return (
        <View>
            <InputWithLabel
                control={control}
                name='email'
                label='이메일'
                placeHolder="Email@example.com"
                invisible={false}
                rules={{
                    required: "Please enter your email.",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email format."
                    }
                }}
            />
            <InputWithLabel
                control={control}
                name='password'
                label='비밀번호'
                placeHolder='Password'
                invisible={true}
                rules={{
                    required: "Please enter your password.",
                    minLength: {
                        value: 6,
                        message: "Please enter at least 6 characters."
                    },
                    maxLength: {
                        value: 14,
                        message: "You can enter up to 14 characters only."
                    }
                }}
            />
            <InputWithLabel
                control={control}
                name='confirm_password'
                label='비밀번호 확인'
                placeHolder='Confirm Password'
                invisible={true}
                rules={{
                    validate: (value) => value === watch("password") || "Passwords do not match"
                }}
            />
            <InputWithLabel
                control={control}
                name='nickName'
                label='닉네임'
                placeHolder='닉네임'
                invisible={false}
            />
            <Pressable onPress={() => { navigation.navigate("Login") }}><Text>Login</Text></Pressable>
            <Button onPress={handleSubmit(onSubmit)}>Register</Button>
        </View>
    )
}