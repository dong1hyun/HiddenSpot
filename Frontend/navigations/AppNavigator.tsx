import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { supabase } from "../lib/supabase";

export default function AppNavigator() {
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
    return (
        <Pressable onPress={signOut}><Text style={styles.button}>Log Out</Text></Pressable>
    )
}

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
  }  
});