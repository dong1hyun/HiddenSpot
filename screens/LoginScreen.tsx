import { Alert } from 'react-native'
import AuthForm from '../components/molecules/AuthForm'
import { supabase } from '../lib/supabase'
import { AuthType } from '../lib/type'

export default function LoginScreen() {
    async function signInWithEmail({email, password, setLoading} : AuthType) {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        
        if (error) Alert.alert(error.message)
        setLoading(false)
      }
    return (
        <AuthForm onSubmit={signInWithEmail} title='Login' isLogin={true} />
    )
}