<script setup lang="ts">
import { useModalStore } from '@/store'

const supabase = useSupabaseClient()

const { registerModal } = useModalStore()
const dialogNode = ref<null | HTMLDialogElement>(null)

async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/redirect`,
    },
  })
  if (error) {
    console.error('登入失敗:', error)
  }
}

onMounted(() => {
  registerModal('login', dialogNode.value!)
})
</script>

<template>
  <dialog
    ref="dialogNode"
    class="border-none p-0 outline-none rounded-xl transition-all duration-400 max-w-20vw shadow-lg animate-close"
    @click.self="dialogNode!.close()"
  >
    <div class="flex flex-col p-2vw w-full">
      <button @click="loginWithGoogle">
        Google Login
      </button>
    </div>
  </dialog>
</template>

<style>
@keyframes open {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes close {
  from { opacity: 1; }
  to { opacity: 0; }
}

dialog[open] {
  animation: open 0.4s forwards;
}

dialog:not([open]) {
  animation: close 0.4s forwards;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
