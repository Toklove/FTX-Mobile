import { defineStore } from "pinia";

export const defaultStore = defineStore("default", () => {
  const showChangeLang = false;
  return { showChangeLang };
});


// export const usePiniaState = defineStore({
//     id: 'textPinia',
//     state: () => {
//         return {
//             userName: ''
//         }
//     },
//     getters: {

//     },
//     actions: {
//         getUserNmae(data) {
//             this.userName = data
//         }
//     }
// })