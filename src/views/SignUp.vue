<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="./../../public/assets/img/b.jpg" alt="Ionic logo" />
      </div>

      <form novalidate @submit.prevent="signUp()">
        <ion-list>
          <ion-item>
            <ion-input
              label="First Name"
              labelPlacement="stacked"
              v-model="firstName"
              name="firstName"
              type="text"
              spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              label="Last Name"
              labelPlacement="stacked"
              v-model="lastName"
              name="lastName"
              type="text"
              spellcheck="false"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              labelPlacement="stacked"
              label="Password"
              v-model="password"
              name="password"
              type="password"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              labelPlacement="stacked"
              label="Confirm Password"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-input
              labelPlacement="stacked"
              label="Email"
              v-model="email"
              name="email"
              type="email"
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
                <ion-datetime id="datetime" presentation="date" :show-default-buttons="true" v-model="birthDate"></ion-datetime>
            </ion-modal>
          </ion-item>
        </ion-list>

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button :disabled="!canSubmit" type="submit" expand="block">Sign Up!</ion-button>
          </ion-col>
        </ion-row>
      </form>
      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :duration="2000"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonRow,
  IonCol,
  IonInput,
  IonToast,
  IonIcon,
  IonDatetime,
  IonModal,
  IonDatetimeButton
} from "@ionic/vue";
import { logoGoogle } from 'ionicons/icons';
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle, createDocument, getDocument, questionsNumber, getRandomQuestion} from './../firebase/init.ts'
import { useRouter } from "vue-router";

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const confirmPassword = ref("");
const password = ref("");
const email = ref("");
const birthDate = ref(new Date().toISOString().slice(0, 10));

const submitted = ref(false);

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
  () => firstName.value.trim() !== "" && lastName.value.trim() !== "" && password.value.trim() !== "" && confirmPassword.value.trim() !== "" && email.value.trim() !== "" && birthDate.value !== new Date().toISOString().slice(0, 10)
);

const signUp = () => {
    console.log(birthDate.value)
};

</script>

<style scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}

.login-logo img {
  max-width: 150px;
}

.list {
  margin-bottom: 0;
}
</style>
