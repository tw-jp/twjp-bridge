<script setup lang="ts">
const supabase = useSupabaseClient()

async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/login/redirect', // 登入成功後跳轉到這裡
    },
  })
  console.log(data)

  if (error)
    console.error('登入失敗:', error)
}

async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('登出失敗:', error.message)
  } else {
    console.log('已成功登出')
  // 你可以選擇在登出後做一些其他的操作，例如重定向到登錄頁面
  }
}
</script>

<template>
  <!-- <div class="">
    {{ response }}
  </div> -->
  <button @click="loginWithGoogle">
    我要登入
  </button>
  <button @click="logout">
    我要登出
  </button>
</template>
