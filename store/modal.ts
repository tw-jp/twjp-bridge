import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
    type ModalName = keyof typeof modalMap.value

    const modalMap = ref<Record<string, HTMLDialogElement | null>>({
      login: null,
    })

    /**
     * @description 全域註冊 modal
     * @param {ModalName} modalName - modal 名稱
     * @param {HTMLDialogElement} dialogNode - dom 節點
     */
    function registerModal(modalName: ModalName, dialogNode: HTMLDialogElement): void {
      modalMap.value[modalName] = dialogNode
    }

    /**
     * @description 開啟 modal
     * @param {ModalName} modalName - modal 名稱
     */
    function useModal(modalName: ModalName): void {
      modalMap.value[modalName]!.showModal()
    }

    return { registerModal, useModal }
})
