<template>	
		<ion-tabs>
            <ion-router-outlet />
			<ion-tab-bar>
				<ion-tab-button :tab="item.label" v-for="(item, index) in data" :key="index" @click="goto(item, index)" v-bind:class="{'selectedItem': selected[index]}">
					<ion-icon :icon="item.icon"></ion-icon>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>

</template>

<script>
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet } from "@ionic/vue";

export default {
	name: "page-footer",
	components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonRouterOutlet },
    data() {
        return {
            selected: [true, false, false]
        }
    },
    props: {
		data: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	methods: {
		goto(item, index) {
            this.selected = [false, false, false]
            this.selected[index] = true
			this.$emit("goto", item.route)
		}
	}
}
</script>

<style lang="scss" scoped>
// .footer {
//   position: fixed;
//   bottom: 100px;
// 	z-index: 999;
//   width: 100%;
// }

ion-tab-bar {
	padding: 0;
	height: 60px;
	--background: #000000;
}

.selectedItem {
	background: #262626;
    border: 1px #2f2f2f solid;
    color: #717070;
}
</style>
