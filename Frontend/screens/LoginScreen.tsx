import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/atoms/Button';
import { AuthStackParamList, LoginFormType } from '../lib/type';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Error from '../components/atoms/Error';
import ScreenContainer from '../components/templates/ScreenContainer';
import InputWithLabel from '../components/atoms/InputWithLabel';
import LoadingOverlay from '../components/atoms/Loading';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
  const [loading, setLoading] = useState(false);
  async function signInWithEmail({ email, password }: LoginFormType) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    signInWithEmail({ email: data.email, password: data.password });
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
      <Pressable onPress={() => { navigation.navigate("Register") }}><Text style={sytles.toggleButton}>회원가입</Text></Pressable>
      <Button onPress={handleSubmit(onSubmit)} isLoading={loading}>로그인</Button>
      {loading && <LoadingOverlay />}
    </ScreenContainer>
  );
};

const sytles = StyleSheet.create({
  toggleButton: {
    marginVertical: 20,
    color: "#7f8c8d",
  }
});