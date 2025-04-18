<script setup lang="ts">
import { useModalStore } from '../../store'

const { registerModal } = useModalStore()
const dialogNode = ref<null | HTMLDialogElement>(null)

onMounted(() => {
  registerModal('login', dialogNode.value!)
})
</script>

<template>
  <dialog ref="dialogNode" class="dialog" @click.self="dialogNode!.close()">
    <div class="dialog__inner">
      hello world
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.dialog {
  border: none;
  padding: 0;
  outline: none;
  border-radius: 12px;
  transition: display 0.4s allow-discrete, overlay 0.4s allow-discrete;
  animation: close 0.4s forwards;
  max-width: 20vw;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  &[open] {
    animation: open 0.4s forwards;
  }
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &__inner {
    @include flex();
    flex-direction: column;
    padding: 2vw;
    width: 100%;
  }
}

@keyframes open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
