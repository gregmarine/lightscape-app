import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePrayerStore = defineStore('prayer', () => {
  const count = ref(0)
  const name = ref('Greg')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})