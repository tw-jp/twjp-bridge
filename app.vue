<script setup lang="ts">
import { useProfileStore } from '@/store'

const { userInit } = useProfileStore()

onBeforeMount(async () => {
  await userInit()
})
</script>

<template>
  <div class="main">
    <ModalLogin />
    <NuxtPage />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
}
</style>
