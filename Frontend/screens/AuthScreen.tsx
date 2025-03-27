import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { supabase } from '../lib/supabase'
import Button from '../components/atoms/Button';
import { useState } from 'react';
import Error from '../components/atoms/Error';
import ScreenContainer from '../components/templates/ScreenContainer';
import FullScreenLoader from '../components/atoms/FullScreenLoader';

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [tokenError, setTokenError] = useState("");
  async function sendOtp() {
    try {
      setLoading(true);
      if (email.length === 0) {
        setEmailError("이메일을 입력해주세요");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("유효하지 않은 이메일 형식입니다");
        return;
      }
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) {
        console.error(error);
        return;
      }

      Alert.alert("인증번호 발송 성공!", "이메일로 발송된 인증번호를 확인해주세요");
      setEmailError("");
      setIsSendOtp(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const verifyWithOtp = async () => {
    setLoading(true);
    const {
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) {
      setTokenError("만료 혹은 잘못된 인증번호입니다");
    }
    setLoading(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenContainer>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="Email@example.com"
          value={email}
          onChangeText={(text) => { setEmail(text) }}
          textAlignVertical="top"
          textAlign="left"
        />
        <Error message={emailError} />
        <Button buttonStyle={{ marginVertical: 12 }} onPress={sendOtp} disabled={loading}>이메일로 인증번호 발송</Button>
        {
          isSendOtp &&
          <>
            <Text style={styles.label}>인증번호</Text>
            <TextInput
              style={styles.input}
              placeholder="6자리"
              value={token}
              onChangeText={(text) => { setToken(text) }}
              textAlignVertical="top"
              textAlign="left"
              keyboardType='number-pad'
            />
            <Button buttonStyle={{ marginVertical: 12 }} onPress={verifyWithOtp} disabled={token.length !== 6}>인증</Button>
            <Error message={tokenError} />
          </>

        }
      </ScreenContainer>
      <FullScreenLoader loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  label: {
    marginTop: 12,
    marginBottom: 5,
  },
  input: {
    borderColor: '#dfe6e9',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8
  }
});