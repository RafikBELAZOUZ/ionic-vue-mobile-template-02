<template>
  <ion-app>
    <h4 class="not-mobile">
      Template is built for mobile, for best experience please use a mobile device or use the browser in mobile mode.
    </h4>
    <ion-router-outlet />
    <Footer :data="footer" v-if="$route.name != 'login' && $route.name !='signUp'" @goto="goto" />
    <Footer2 :data="footer" v-if="$route.name == 'test'" @goto="goto" />
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
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle, createDocument, getDocument, questionsNumber, getRandomQuestion, onAuthChanged} from './firebase/init.ts'

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
          route: "/",
          icon: home
        },
        {
          label: "Notifications",
          route: "/product-view",
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
  async beforeCreate(){
    onAuthChanged()
    if(!localStorage.getItem("currentUser")){
        console.log("Current User : ")
        console.log(localStorage.getItem("currentUser"))
        this.$router.push({name: 'login'});
    }
    else{
        console.log("Current User : ")
        console.log(JSON.parse(localStorage.getItem("currentUser")))
        this.$router.push({name: 'home'});
    }
    /*await setTimeout(() =>{
            console.log("Current User in before: ")
            console.log(auth.currentUser)
            if(!auth.currentUser)
                this.$router.push({name: 'login'});
            else{
                this.$router.push({name: 'home'});
                }
        }, 1000);*/
  },
  created(){
    //this.createQuestion()
  },
  methods: {
    goto(route) {
      this.$router.push(route);
    },
    async createQuestion(){
      const email = 'rafik.belazouz191@gmail.com';
      const password = 'rafik2000';

      //await signInEmailAndPassword(email, password)

      const dataObj = {
        answer: 'John' + Date.now(),
        quesiton: 'Doe' + Date.now(),
        tags: '1990' + Date.now()
      }

      //await getRandomQuestion('QuestionsTest')

      console.log("Current User : ")
      console.log(auth.currentUser)

      //console.log("Number of documents : " + await questionsNumber())
      
    }
  }
});
</script>
