<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<template>
  <button :style="{ backgroundColor: color }">
    Hello
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 16px 20px;
}
</style>
