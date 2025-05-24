import type { ProfilesDatabase } from '@/types'
import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

type UserProfile = ProfilesDatabase['public']['Tables']['profiles']['Row']

export const useProfileStore = defineStore('db-profiles', () => {
  const supabase = useSupabaseClient<ProfilesDatabase>()

  const userSession = ref<Session | null>(null)
  const userProfile = ref<UserProfile | null>()
  const userData = ref<User | null>(null)

  const isApiLoading = ref(true)
  const isLogin = ref(false)

  async function getUserProfile(id: string) {
    try {
      console.warn('getUserProfile called with id:', id)
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Supabase error in getUserProfile:', error)
        return null
      }

      console.warn('getUserProfile result:', data)
      return data
    } catch (e) {
      console.error('Error in getUserProfile:', e)
      return null
    }
  }

  async function getUserData(): Promise<User | null> {
    try {
      console.log('getUserData')
      if (userData.value) {
        return userData.value
      }
      const { data: { user } } = await supabase.auth.getUser()
      return user || null
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async function userInit() {
    try {
      supabase.auth.onAuthStateChange(async (_event, session) => {
        console.log('event', _event)
        console.log('session', session)
        if (!session) {
          isLogin.value = false
          console.log('session is null')
          return
        }
        console.log('session is not null')
        userSession.value = session
        userProfile.value = await getUserProfile(session.user.id)
        userData.value = await getUserData()
        isLogin.value = true
        console.log('userInit success')
      })
    } catch (e) {
      console.error(e)
    } finally {
      isApiLoading.value = false
    }
  }

  return { isLogin, isApiLoading, userSession, userProfile, userData, getUserData, userInit }
})
