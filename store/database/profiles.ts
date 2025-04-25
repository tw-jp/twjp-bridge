import type { ProfilesDatabase } from '@/types'
import type { Session } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

type UserProfile = ProfilesDatabase['public']['Tables']['profiles']['Row']

export const useProfileStore = defineStore('db-profiles', () => {
  const supabase = useSupabaseClient<ProfilesDatabase>()

  const userSession = ref<Session | null>(null)
  const userProfile = ref<UserProfile | null>()

  const isApiLoading = ref(true)
  const isLogin = computed(() => {
    if (isApiLoading.value) {
      return false
    }
    return userProfile.value ? true : false
  })

  async function getUserProfile(id: string) {
    const { data } = await supabase
      .from('profiles')
      .select()
      .eq('id', id)
      .single()
    return data
  }

  async function getUserSession() {
    const response = await supabase.auth.getSession()
    return response.data.session
  }

  async function userInit() {
    try {
      const session = await getUserSession()
      if (!session) {
        return
      }

      userSession.value = session
      userProfile.value = await getUserProfile(session.user.id)
    } catch (e) {
      console.error(e)
    } finally {
      isApiLoading.value = false
    }
  }

  return { isLogin, isApiLoading, userSession, userProfile, userInit }
})
