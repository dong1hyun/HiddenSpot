import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from "./navigations/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  const Stack = createStackNavigator();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);


  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {session?.user?.id ?
          <AppNavigator /> :
          <AuthNavigator />
        }
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }  
});