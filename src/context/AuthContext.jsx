import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

async function getProfile(userId) {
  if (!userId) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin, full_name')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error('Could not load profile:', error.message)
    return null
  }

  return data
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadSession() {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)

    if (data.session?.user) {
      setProfile(await getProfile(data.session.user.id))
    } else {
      setProfile(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)

      if (newSession?.user) {
        setProfile(await getProfile(newSession.user.id))
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signUp = (email, password, fullName) =>
    supabase.auth.signUp({
      email,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    })

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signOut = () => supabase.auth.signOut()

  const resetPassword = (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    isAdmin: profile?.is_admin === true,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    refreshProfile: async () => setProfile(await getProfile(session?.user?.id)),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
