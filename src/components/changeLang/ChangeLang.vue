<template>
  <div>
    <van-popup :show="store.showChangeLang" position="bottom" round>
      <van-picker
        :cancel-button-text="t('cancel')"
        :columns="langList"
        :columns-field-names="customFieldName"
        :confirm-button-text="t('confirm')"
        :title="t('changeLang')"
        @cancel="onCancel"
        @change="onChange"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "ChangeLang"
};
</script>

<script setup>
import { useI18n } from "vue-i18n";

import { reactive } from "vue";
import { defaultStore } from "@/store/testPinia";
import { changeLangToGlobal } from "@/plugins/i18n";

const store = defaultStore();
const { t } = useI18n();

function onCancel() {
  store.showChangeLang = false;
}

function onChange(val) {
  // console.log(val);
}

function onConfirm(val) {
  console.log(val);
  changeLangToGlobal(val.value);
  store.showChangeLang = false;
}

const langList = reactive([
  {
    value: "zh",
    name: "简体中文"
  },
  {
    value: "en",
    name: "English"
  }
]);

const customFieldName = {
  text: "name",
  value: "value"
};
</script>

<style scoped>

</style>