<script setup lang="ts">
import { useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'

const { isLogin, isApiLoading, userProfile } = storeToRefs(useProfileStore())
const { userInit } = useProfileStore()

onBeforeMount(async () => {
  await userInit()
})
</script>

<template>
  <div class="main">
    {{ isApiLoading }}
    <p v-if="isApiLoading">
      檢查登入中
    </p>
    <div v-if="isLogin">
      {{ userProfile }}
    </div>
    <div v-else>
      尚未登入fff
    </div>
    <ModalLogin />
    <NuxtPage />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
}
</style>
