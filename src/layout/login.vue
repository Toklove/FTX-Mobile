<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon color="#333" name="arrow-left"></van-icon>
      </template>
      <template #right>
        <div @click="changeLang">
          <span class="right-text">{{ $t("lang") }}</span>
          <van-icon name="arrow-down" style="color: rgb(100, 101, 102)" />
        </div>
      </template>
    </van-nav-bar>
    <div class="logo-area"><img alt=""
                                src="https://server.ftx668.vip/storage/images/d9f9269c92e13bc33f916952dc09ddd2.png">
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userInfo.username"
          :label="t('auth.username')"
          :name="t('auth.username')"
          :placeholder="t('auth.username')"
          :rules="[{ required: true, message: t('auth.pleaseEnterAccount') }]"
        />
        <van-field
          v-model="userInfo.password"
          :label="t('auth.password')"
          :name="t('auth.password')"
          :placeholder="t('auth.password')"
          :rules="[{ required: true, message: t('auth.pleaseEnterPassword') }]"
          type="password"
        />
        <div style="margin: 16px;">
          <van-button block native-type="submit" round type="primary">
            登录
          </van-button>
        </div>

      </van-cell-group>
    </van-form>
    <van-divider>or</van-divider>
    <div class="footer px-3">
      <div class="footer-option"><span class="r-text">{{ t("auth.forgot") }}</span></div>
      <div class="footer-option"><span>{{ t("auth.noAccount") }},</span><span class="r-text">{{ t("auth.registerNow")
        }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>
<script setup>

import { defaultStore } from "@/store/testPinia";
import { reactive } from "vue";
import { login } from "@/api/user";
import { Notify } from "vant";
import { useI18n } from "vue-i18n";
import router from "@/router";

const store = defaultStore();

const { t } = useI18n();

function changeLang() {
  store.showChangeLang = true;
  console.log(store.showChangeLang);
}

const userInfo = reactive({
  username: "",
  password: ""
});

function onSubmit() {
  login(userInfo).then(res => {
    if (res.code !== 0) {
      Notify(res.message);
    } else {
      Notify({ type: "success", message: res.message });
      localStorage.setItem("TOKEN", res.data.token);
      localStorage.setItem("USERINFO", JSON.stringify(res.data));
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  });
}

</script>
<style lang="scss" scoped>
.logo-area {
  font-family: Microsoft YaHei;
  font-size: 14px;
  color: #333;
  margin: 0;
  display: block;
  text-align: center;
  padding-bottom: 15px !important;
  padding-top: 20px !important;

  img {
    height: 80px;
    width: 80px;
  }
}

.footer {
  display: flex;
  justify-content: space-between;

  .footer-option {
    .r-text {
      color: #ea3131;
    }
  }
}
</style>