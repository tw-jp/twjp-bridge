import { useProfileStore } from '@/store'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { userData, isApiLoading } = storeToRefs(useProfileStore())

  // 確保 userData 已經初始化
  if (!userData.value && isApiLoading.value) {
    const { getUserData } = useProfileStore()
    userData.value = await getUserData()
  }

  if (!userData.value) {
    useNuxtApp().$toast.error('請先登入')
    return navigateTo('/login')
  }
})
