<script setup lang="ts">
const router = useRouter()

onBeforeMount(() => {
  router.replace('/')
})
</script>

<template>
  <div class="">
    <!-- <NuxtLink to="/profile">
      Profile Page
    </NuxtLink> -->
  </div>
</template>
