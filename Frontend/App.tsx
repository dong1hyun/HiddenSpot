import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import AuthNavigator from './navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./navigations/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthStore from "./store/AuthStore";
import queryClient from "./util/queryClient";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const {setEmail, setNickName} = AuthStore();
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
    const email = session?.user?.email;
    const nickName = session?.user?.user_metadata?.nickName;
    if(email) setEmail(email);
    if(nickName) setNickName(nickName);
  }, [session]);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {session?.user?.id ?
              <AppNavigator /> :
              <AuthNavigator />
            }
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  }
});