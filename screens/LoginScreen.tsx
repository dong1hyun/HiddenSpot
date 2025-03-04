import { Alert, Pressable, Text, TextInput, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import InputWithLabel from '../components/atoms/InputWithLabel';
import Button from '../components/atoms/Button';
import { AuthStackParamList, LoginFormType } from '../lib/type';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>();
  const [loading, setLoading] = useState(false);
  async function signInWithEmail({ email, password }: LoginFormType) {
    console.log(email, password)
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
    <View>
      <InputWithLabel control={control} name='email' placeHolder="Email@example.com" label='이메일' invisible={false} />
      <InputWithLabel control={control} name='password' placeHolder='비밀번호' label='비밀번호' invisible={true} />
      <Pressable onPress={() => { navigation.navigate("Register") }}><Text>Register</Text></Pressable>
      <Button onPress={handleSubmit(onSubmit)}>Login</Button>
    </View>
  );
};