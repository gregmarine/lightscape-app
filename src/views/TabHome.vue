<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button id="open-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-list>
        <ion-item v-for="request, index in store.requests" :key="index">
          <ion-label>{{ request.content }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>New Prayer Request</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              label="Enter prayer request"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Prayer Request"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonInput } from '@ionic/vue'
import { OverlayEventDetail } from '@ionic/core/components';
import { add } from 'ionicons/icons';
import { usePrayerStore } from '@/stores/prayer'

const modal = ref();
const input = ref();

const store = usePrayerStore()

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    store.addRequest(ev.detail.data)
  }
};

onMounted(() => {
  store.loadRequests()
})
</script>
