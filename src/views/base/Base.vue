<template>
  <div>
    <van-nav-bar :title="t('assets.title')" />
    <div class="all-box">
      <div class="top">
        <div class="title">總資產折合(BTC)</div>
      </div>
      <div class="center">
        <div class="amount">0.00000000</div>
        <div class="amount-to-usd">≈0.00000000 USD</div>
      </div>
      <div class="bottom">
        <div class="button-group">
          <div class="button">
            <div class="button-icon">
              <img alt="" src="src/assets/img/13.png">
            </div>
            <div class="button-text">充幣</div>
          </div>
          <div class="button">
            <div class="button-icon">
              <img alt="" src="src/assets/img/5.png">
            </div>
            <div class="button-text">提幣</div>
          </div>
          <div class="button">
            <div class="button-icon">
              <img alt="" src="src/assets/img/hua.png">
            </div>
            <div class="button-text">劃轉</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Base"
};
</script>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.all-box > div {
  margin-bottom: 10px !important;
}

.all-box {
  user-select: none;
  font-family: Microsoft YaHei;
  font-size: 14px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: var(--light, #fff);
  margin-left: 15px !important;
  margin-right: 15px !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
  box-sizing: border-box;
  background-size: 100% auto;
  background: url(src/assets/img/bgb3.png) no-repeat 100% 100%;
  border-radius: 10px;
  //background-image: url(./static/img/bgb3.9daef206.png);
  position: relative;

  .top {
    user-select: none;
    font-size: 14px;
    color: var(--light, #fff);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px !important;
    width: 100%;

    .title {
      user-select: none;
      margin: 0;
      display: block;
      font-size: 16px;
      color: #666;
    }
  }

  .center {
    user-select: none;
    font-size: 14px;
    color: #333;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 15px !important;
    width: 100%;

    .amount {
      color: #333;
      text-align: center;
      font-size: 28px;
      width: 100%;
      margin-bottom: 10px;
    }

    .amount-to-usd {
      color: #333;
      text-align: center;
      margin: 0;
      font-size: 12px;
      margin-left: 15px !important;
      width: 100%;
    }
  }

  .bottom {
    font-size: 14px;
    color: #333;
    margin: 0;
    display: block;
    margin-top: 8px !important;
    padding-bottom: 8px !important;
    width: 100%;

    .button-group {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 26px;

      .button {
        margin: 0;
        height: auto;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f7f7f7;
        border-radius: 6px;
        box-shadow: 3px 3px 7px #d9d9d9, -5px -5px 10px #ffffff;;
        padding: 5px 0;
        width: 30%;

        .button-icon {
          cursor: pointer;
          margin: 0;
          -webkit-tap-highlight-color: transparent;
          display: flex;
          align-items: center;
          margin-right: 6px !important;

          img {
            width: 25px;
            height: 25px;
          }
        }

        .button-text {
          cursor: pointer;
          margin: 0;
          vertical-align: middle;
          color: #333;
        }
      }
    }
  }
}
</style>
