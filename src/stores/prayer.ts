import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { PrayerRequest } from '@/types/Entity'

export const usePrayerStore = defineStore('prayer', () => {
  const requests = ref<PrayerRequest[]>([])

  const loadRequests = () => {
    const prayerRequests = localStorage.getItem("prayerRequests")
    requests.value = prayerRequests !== null ? JSON.parse(prayerRequests) : []
  }

  const addRequest = (content: string) => {
    const request = new PrayerRequest()
    request.content = content

    requests.value.push(request)

    localStorage.setItem("prayerRequests", JSON.stringify(requests.value))
  }

  const count = ref(0)
  const name = ref('Greg')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { requests, loadRequests, addRequest, count, name, doubleCount, increment }
})