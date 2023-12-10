<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="start">
        <ion-fab-button @click="getQuestion()" size="large">
            <ion-icon :icon="chevronBack"></ion-icon>
        </ion-fab-button>
    </ion-fab>

    <!--<div>
        <div class="card" @click="productView"></div>
        <h3>Blackberry</h3>
        <p>{{ question.quesiton }}</p>
    </div>-->

    <ion-card color="light">
        <ion-card-header class="ion-margin">
            <ion-card-title class="ion-margin">Question</ion-card-title>
            <ion-card-subtitle>Loved by 5 Engineers !</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> {{question.quesiton}} </ion-card-content>

        <ion-card-title style="font-size: 1.5em; margin-top: 50px;">Answer</ion-card-title>
        <ion-card-content ref="$answer" style="filter: blur(1px);"> {{question.answer}} </ion-card-content>
    </ion-card>

    <ion-fab vertical="center" horizontal="start">
        <ion-fab-button @click="showAnswer()" size="default">
            <ion-icon :icon="chevronBack"></ion-icon>
        </ion-fab-button>
    </ion-fab>

    <ion-fab vertical="center" horizontal="end">
        <ion-fab-button @click="getQuestion()" size="large">
            <ion-icon :icon="chevronForward"></ion-icon>
        </ion-fab-button>
    </ion-fab>
	
</template>

<script setup>
import {db, auth, signInEmailAndPassword, createUserEmailAndPassword, logout, signInGoogle, createDocument, getDocument, questionsNumber, getRandomQuestion, onAuthChanged} from '../firebase/init.ts'
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
  IonFab,
  IonFabButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/vue";
import { chevronForward, chevronBack, heart } from 'ionicons/icons';
import { computed, ref, onMounted } from "vue";

const question = ref("")
const $answer = ref(null)

const getQuestion = async () => { 
    question.value = await getRandomQuestion("QuestionsTest")    
}

const showAnswer = async () => { 
    console.log(JSON.parse(JSON.stringify($answer.value)))
    console.log($answer.value.innerText)
}

const previousQuestion = async () => { 
    question.value = await getRandomQuestion("QuestionsTest")    
}


onMounted(() => {
  getQuestion()
})

</script>

<style lang="scss" scoped>
.card {
	background: #000000;
  background-image: url("../../public/assets/img/b.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
	border-radius: 30px;
	height: 370px;
  // height: 60%; somehow % is not working
	margin: 0 3px;
}

h3 {
	padding: 0 0 0 30px;
	color: #d6d6d6;
	font-size: 30px;
	font-weight: 600;
	margin: -90px 0 -15px 0;
	z-index: 9999999999;
}

p {
	padding: 0 0 0 30px;
	color: #a7a7a7;
	font-weight: 500;
}



</style>
