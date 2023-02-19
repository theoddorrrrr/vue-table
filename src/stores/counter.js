import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(2)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const double = () => {
    count.value *= 2
  }

  return { count, doubleCount, increment,double }
})
