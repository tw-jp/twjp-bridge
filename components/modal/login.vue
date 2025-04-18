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
      <!-- <NuxtImg class="dialog__logo" src="/images/Vertical_P_White.png" alt="logo" /> -->
      <button class="dialog__btn" @click="handleGoogleLogin">
        <img class="dialog__icon" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="">
        使用 Google 登入
      </button>
      <button class="dialog__btn btn-disabled" disabled>
        <img class="dialog__icon" src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="">
        使用 Facebook 登入
      </button>
      <p class="dialog__text">
        繼續登入，代表您同意
        <NuxtLink to="/">
          服務條款
        </NuxtLink>
        。
      </p>
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
    background-image: url('https://i.imgur.com/jV0b035.jpeg');
    background-position: center;
    background-repeat: no-repeat;
  }
}

.dialog {
  &__logo {
    width: 90%;
    margin-bottom: 1vw;
  }

  &__btn {
    @include flex();
    font-size: 1vw;
    width: 100%;
    color: #333;
    background-color: #f6f6f6;
    border: none;
    padding: 0.4vw 2vw;
    border-radius: 40px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.8vw;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #f0f0f0;
    }
    &:focus {
      outline: none;
    }
    &:last-of-type {
      margin-bottom: 1.6vw;
    }
  }

  &__icon {
    width: 1.4vw;
    margin-right: 8px;
  }

  &__text {
    font-size: 0.8vw;
    color: #fff;
    a {
      color: #fdfcfb;
    }
  }
}

.btn-disabled {
  cursor: not-allowed;
  background-color: #a9a9a9;
  color: #666;
  &:hover {
    background-color: #a9a9a9;
  }
  .dialog__icon {
    opacity: 0.6;
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
