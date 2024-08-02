<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="request, index in store.requests" :key="index">
          <ion-label>{{ request.content }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/vue'
import { usePrayerStore } from '@/stores/prayer'

const store = usePrayerStore()

onMounted(() => {
  store.loadRequests()
})
</script>
