import { createI18n, LocaleMessages, VueMessageType } from "vue-i18n";
import axios from "axios";


async function getLang(option: string): Promise<LocaleMessages<VueMessageType>> {
  return await axios.get(`/lang/${option}.json`);
}

function changeLangToGlobal(option: any) {
  addLang(option);
  i18n.global.locale.value = option;
  localStorage.setItem("locale", option);
  console.log(i18n.global.locale);
  console.log(i18n.global.messages);
}

function addLang(option: string) {
  getLang(option).then(res => {
    i18n.global.setLocaleMessage(option, res.data);
  });
}

const i18n = createI18n({
  legacy: false,
  locale: "zh",
  // locale: localStorage.getItem("locale") || navigator.language || "zh",
  fallbackLocale: "zh"
});
addLang("zh");
export default i18n;
export { changeLangToGlobal };