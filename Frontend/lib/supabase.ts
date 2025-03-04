import {SUPABASE_URL, SUPABASE_ANONKEY } from '@env'
import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

console.log(SUPABASE_URL, SUPABASE_ANONKEY);
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  } 
});