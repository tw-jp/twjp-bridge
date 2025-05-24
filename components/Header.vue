<script setup lang="ts">
import { useModalStore, useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'

const supabase = useSupabaseClient()
const { isLogin, isApiLoading } = storeToRefs(useProfileStore())

const { useModal } = useModalStore()

async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('登出失敗:', error.message)
    return
  }

  useNuxtApp().$toast.success('登出成功！即將跳轉')
  setTimeout(() => {
    window.location.href = '/'
  }, 5000)
}
</script>

<template>
  <header>
    <div class=" shadow-md mb-4 flex justify-between items-center p-4">
      <div class="logo">
        LOGO
      </div>
      <div v-if="isApiLoading">
        loading....
      </div>
      <div v-else>
        <button v-if="!isLogin" @click="() => useModal('login')">
          登入
        </button>
        <button v-else @click="logout">
          登出
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
