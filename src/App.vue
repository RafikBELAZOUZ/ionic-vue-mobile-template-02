<template>
  <ion-app>
    <h4 class="not-mobile">
      Template is built for mobile, for best experience please use a mobile device or use the browser in mobile mode.
    </h4>
    <ion-router-outlet />
    <Footer :data="footer" v-if="!homePage" @goto="goto" />
    <Footer2 :data="footer" v-if="homePage" @goto="goto" />
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
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle} from './firebase/init.ts'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Footer,
    Footer2
  },
  computed: {
    homePage() {
      return true;
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
    this.createQuestion()
  },
  methods: {
    goto(route) {
      this.$router.push(route);
    },
    async createQuestion(){
      const email = 'rafik.belazouz19@gmail.com';
      const password = 'rafik2000';

      if(!auth.currentUser)
        signInGoogle()
      else 
      console.log(auth.currentUser)

      const colRef = collection(db, 'QuestionsTest')
      // data to send
      const dataObj = {
        answer: 'John' + Date.now(),
        quesiton: 'Doe' + Date.now(),
        tags: '1990' + Date.now()
      }

      // create document and return reference to it
      //const docRef = await addDoc(colRef, dataObj)

      // access auto-generated ID with '.id'
      //console.log('Document was created with ID:', docRef.id)

    }
  }
});
</script>
