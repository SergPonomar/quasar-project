import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import type { InfoCard } from 'src/types'

export const useMainStore = defineStore('main', () => {
  const infoCards = ref<InfoCard[]>([])

  async function fetchInfoCards() {
    try {
      const { data } = await api.get('/api/info-cards.json')
      infoCards.value = data
    } catch (_e) {}
  }

  return {
    infoCards,
    fetchInfoCards,
  }
})
