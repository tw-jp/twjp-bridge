<script setup lang="ts">
import { useModalStore } from '../store'

const { useModal } = useModalStore()

useSeoMeta({
  title: 'test',
  description: 'test',
})
</script>

<template>
  <div>
    <button @click="() => useModal('login')">
      open!!
    </button>
    <NuxtLink to="/login">
      前往登入
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">

</style>
