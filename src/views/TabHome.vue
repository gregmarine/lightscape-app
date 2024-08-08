<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button id="open-modal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-list>
        <ion-item v-for="request, index in store.requests" :key="index" @click="editOpen(request.content)">
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
            <ion-textarea
              label="Enter prayer request"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Prayer Request"
              :counter="true"
              :maxlength="500"
              :rows="20"
            ></ion-textarea>
          </ion-item>
        </ion-content>
      </ion-modal>

      <ion-modal ref="editModal" :is-open="editIsOpen" @willDismiss="onEditWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="editCancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Edit Prayer Request</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="editConfirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-textarea
              label="Enter prayer request"
              label-placement="stacked"
              ref="editInput"
              type="text"
              placeholder="Prayer Request"
              :counter="true"
              :maxlength="500"
              :rows="20"
            ></ion-textarea>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonTextarea } from "@ionic/vue"
import { OverlayEventDetail } from "@ionic/core/components"
import { add } from "ionicons/icons"
import { usePrayerStore } from "@/stores/prayer"

const modal = ref()
const input = ref()

const editModal = ref()
const editIsOpen = ref(false)
const editInput = ref()

const store = usePrayerStore()

const cancel = () => modal.value.$el.dismiss(null, "cancel")

const confirm = () => {
  const name = input.value.$el.value
  modal.value.$el.dismiss(name, "confirm")
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === "confirm") {
    store.addRequest(ev.detail.data)
  }
};

const editOpen = (content: string) => {
  editInput.value = content
  editIsOpen.value = true
}

const editCancel = () => editModal.value.$el.dismiss(null, "cancel")

const editConfirm = () => {
  const content = editInput.value.$el.value
  editModal.value.$el.dismiss(content, "confirm")
}

const onEditWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === "confirm") {
    store.addRequest(ev.detail.data)
  }

  editIsOpen.value = false
}

onMounted(() => {
  store.loadRequests()
})
</script>
