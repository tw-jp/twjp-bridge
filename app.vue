<script setup lang="ts">
import { useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'

const { userProfile } = storeToRefs(useProfileStore())

const { userInit } = useProfileStore()

onBeforeMount(async () => {
  await userInit()
})
</script>

<template>
  <div>
    <Header />
    <div v-if="userProfile">
      <img :src="userProfile.avatar" alt="">
      <p>會員id: {{ userProfile.id }}</p>
      <p>會員名稱: {{ userProfile.name }}</p>
      <p>會員性別: {{ userProfile.sex }}</p>
      <p>會員介紹: {{ userProfile.introduce }}</p>
      <p>會員來源: {{ userProfile.from }}</p>
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
