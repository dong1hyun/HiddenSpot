import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { AuthStackParamList, AuthType } from '../../lib/type'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
    onSubmit: ({email, password, setLoading}: AuthType) => void
    title: "Register" | "Login",
    isLogin: boolean
}

export default function AuthForm({onSubmit, title, isLogin}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
    const to = isLogin ? "Register" : "Login";
    const toggleAuth = () => {
        navigation.navigate(to);
    }
    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <Pressable onPress={toggleAuth}><Text>{to}</Text></Pressable>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title={title} disabled={loading} onPress={() => onSubmit({email, password, setLoading})} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})