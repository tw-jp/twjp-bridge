<script setup lang="ts">
import { useModalStore } from '../store'

const { useModal } = useModalStore()

useSeoMeta({
  title: 'test',
  description: 'test',
})
</script>

<template>
  <div class="home">
    <button @click="() => useModal('login')">
      open!!
    </button>
    <NuxtLink to="/login">
      前往登入
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.home {
  @include size(100%, 100%);
  background-image: linear-gradient(to bottom right, #fdfcfb, #e2d1c3);
}
</style>
