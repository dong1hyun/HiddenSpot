import { Alert } from 'react-native'
import AuthForm from '../components/molecules/AuthForm'
import { supabase } from '../lib/supabase'
import { AuthType } from '../lib/type'

export default function RegisterScreen() {
    async function signUpWithEmail({ email, password, setLoading }: AuthType) {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false);
    }
    return (
        <AuthForm onSubmit={signUpWithEmail} title='Register' isLogin={false} />
    )
}