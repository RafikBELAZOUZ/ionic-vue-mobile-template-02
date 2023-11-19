<template>
  <ion-app>
    <h4 class="not-mobile">
      Template is built for mobile, for best experience please use a mobile device or use the browser in mobile mode.
    </h4>
    <ion-router-outlet />
    <Footer :data="footer" v-if="!loginPage" @goto="goto" />
    <Footer2 :data="footer" v-if="!loginPage" @goto="goto" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { home, notifications, person, card } from "ionicons/icons";

import Footer from "./components/Footer";
import Footer2 from "./components/Footer2";

import { collection, addDoc } from "firebase/firestore"
// the firestore instance
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle, createDocument, getDocument, questionsNumber, getRandomQuestion} from './firebase/init.ts'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Footer,
    Footer2
  },
  computed: {
    loginPage() {
      return (this.$route.name == "login");
      // return this.store.getters.toggleFooter;
    }
  },
  setup() {
    return {
      home,
      notifications,
      person,
      card
    }
  },
  data() {
    return {
      loggedIn: true,
      footer: [
        {
          label: "Home",
          route: "home",
          icon: home
        },
        {
          label: "Notifications",
          route: "notifications",
          icon: notifications
        },
        {
          label: "Profile",
          route: "profile",
          icon: person
        }
      ]
    }
  },
  created(){
    this.$router.push({name: 'login'});
    console.log(this.$route.name)
    //this.createQuestion()
  },
  methods: {
    goto(route) {
      this.$router.push(route);
    },
    async createQuestion(){
      const email = 'rafik.belazouz191@gmail.com';
      const password = 'rafik2000';

      await signInEmailAndPassword(email, password)

      const dataObj = {
        answer: 'John' + Date.now(),
        quesiton: 'Doe' + Date.now(),
        tags: '1990' + Date.now()
      }

      await getRandomQuestion('QuestionsTest')

      console.log("Current User : ")
      console.log(auth.currentUser)

      console.log("Number of documents : " + await questionsNumber())

    }
  }
});
</script>
