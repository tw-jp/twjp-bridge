<script setup lang="ts">
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${config.public.NUXT_PUBLIC_BASE_URL}/login/redirect`,
    },
  })
  if (error) {
    console.error('登入失敗:', error)
  }
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('登出失敗:', error.message)
  }
}
</script>

<template>
  <!-- <div class="">
    {{ response }}
  </div> -->
  <NuxtLink to="/profile">
    Go to Profile Page
  </NuxtLink>
  <button @click="loginWithGoogle">
    我要登入
  </button>
  <button @click="logout">
    我要登出
  </button>
</template>
