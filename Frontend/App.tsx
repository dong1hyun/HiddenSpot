import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import AuthNavigator from './navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./navigations/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStore from "./store/AuthStore";
import queryClient from "./util/queryClient";
import UserInfoSetting from "./screens/UserInfoSetting";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const { setEmail, setNickName, setInterests, setProfileImageUrl } = AuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
      .catch((error) => {
        console.error(error);
      })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);
  useEffect(() => {
    const metaData = session?.user?.user_metadata;
    const email = session?.user?.email;
    const nickName = metaData?.nickName;
    const interests = metaData?.interests;
    const profileImageUrl = metaData?.profileImageUrl
    if (email) setEmail(email);
    if (nickName) setNickName(nickName);
    if(interests) setInterests(interests);
    if(profileImageUrl) setProfileImageUrl(profileImageUrl);
  }, [session]);
 
  let screen;

  if (session?.user?.user_metadata.nickName) {
    screen = <AppNavigator />;
  } else if (session?.user?.id) {
    screen = <UserInfoSetting />
  } else {
    screen = <AuthNavigator />
  }

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {screen}
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});