<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-logo">
        <img src="./../../public/assets/img/b.jpg" alt="Ionic logo" />
      </div>

      <form novalidate @submit.prevent="onLogin">
        <ion-list>
          <ion-item>
            <ion-input
              label="Username"
              labelPlacement="stacked"
              v-model="username"
              name="username"
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
        </ion-list>

        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button :disabled="!canSubmit" type="submit" expand="block" @click="onLogin()"
              >Login</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button
              @click="onSignup()"
              color="light"
              expand="block"
              >Signup</ion-button
            >
          </ion-col>
        </ion-row>
        <ion-row responsive-sm class="ion-padding">
          <ion-col>
            <ion-button expand="block" @click="loginGoogle()">
                <ion-icon :icon="logoGoogle"></ion-icon>
                    Login with Google!
            </ion-button>
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
  IonIcon
} from "@ionic/vue";
import { logoGoogle } from 'ionicons/icons';
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle, createDocument, getDocument, questionsNumber, getRandomQuestion} from './../firebase/init.ts'
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const submitted = ref(false);

const usernameValid = true;
const passwordValid = true;

const showToast = ref(false);
const toastMessage = ref("");

const canSubmit = computed(
  () => username.value.trim() !== "" && password.value.trim() !== ""
);

const onLogin = async () => {
  submitted.value = true;
  if (usernameValid && passwordValid) {
    console.log("Logged IN!!!!!!");
  }
  else {
    toastMessage.value = "Username or Password is Incorrect";
    showToast.value = true;
    password.value = "";
  }
};

const onSignup = () => {
  toastMessage.value = "Successfully logged in!";

  showToast.value = true;

  username.value = "";
  password.value = "";
};

async function loginGoogle() {
    const user = await signInGoogle()
    console.log(user)
    if(user){
        toastMessage.value = "Successfully logged in!";
        showToast.value = true;
        router.push({name: "home"})
    }
        

}
/*export default {
  name: "login",
  title: "Login",
  requiresAuth: false,
  components: {
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    async loginGoogle() {
        const user = await signInGoogle()
    
        this.$router.push({name: 'home'})

        await console.log(this.$router)
        await console.log(this.$route)
    }
  }
}*/
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
