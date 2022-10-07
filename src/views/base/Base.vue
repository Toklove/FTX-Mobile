<template>
  <div class="container">
    <van-nav-bar :title="t('assets.title')" />
    <div class="all-box">
      <div class="top">
        <div class="title">總資產折合(BTC)</div>
      </div>
      <div class="center">
        <div class="amount">{{ totalBTC() }}</div>
        <div class="amount-to-usd">≈{{ totalUSDT() }} USD</div>
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
    <div class="wallet-box">
      <div class="wallet-header">
        <div class="wallet-content">
          <div class="top"><span>≈{{ totalUSDT() }}</span></div>
          <div class="bottom"><span>總資產折合(USDT)</span></div>
        </div>
      </div>
      <div v-if="coinList.length > 0" class="coin-list">
        <div v-for="item in coinList" :key="item.id" class="coin-item">
          <div class="header">
            <div>
              <img alt="" class="icon" src="https://server.ftx668.vip/storage/images/USDT.png">
              <span class="text">{{ item.coin.unit }}</span>
            </div>
          </div>
          <div class="body">
            <van-row>
              <van-col span="8">
                <div class="title">可用</div>
                <div class="count">{{ item.balance }}</div>
              </van-col>
              <van-col span="8" style="text-align: center">
                <div class="title">冻结</div>
                <div class="count">{{ item.frozenBalance }}</div>
              </van-col>
              <van-col span="8" style="text-align: right">
                <div class="title">折合(USD)</div>
                <div class="count">{{ item.balance * item.coin.usdRate }}</div>
              </van-col>
            </van-row>
          </div>
          <div class="footer"></div>
        </div>
      </div>
      <DataLoading v-else />
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
import { onBeforeMount, reactive } from "vue";
import { wallet } from "@/api/user";
import DataLoading from "@/components/loading/DataLoading.vue";

const { t } = useI18n();

const coinList = reactive([]);

function getData() {
  wallet().then(res => {
    console.log(res);
    res.data.forEach(item => {
      coinList.push(item);
    });
  });
}

function totalBTC() {
  let usdt = totalUSDT();
  let btcRate = 0;
  coinList.forEach(item => {
    if (item.coin.unit === "BTC") {
      btcRate = item.coin.usdRate;
    }
  });
  return (usdt / btcRate).toFixed(8);
}

function totalUSDT() {
  let usdtTotal = 0;
  coinList.forEach(item => {
    usdtTotal += (item.balance + item.frozenBalance) * item.coin.usdRate;
  });
  return usdtTotal.toFixed(8);
}

onBeforeMount(() => {
  getData();
});

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

.coin-list {
  .coin-item {
    user-select: none;
    font-family: Microsoft YaHei;
    font-size: 14px;
    margin: 0;
    display: block;
    border-radius: 20px;
    padding-top: 6px !important;
    text-decoration: none;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 6px !important;
      margin-left: 15px !important;
      margin-right: 15px !important;

      .icon {
        vertical-align: middle;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }

      .text {
        font-weight: 600;
        vertical-align: middle;
        font-size: 18px;
        color: #333;
        padding-left: 12px !important;
      }
    }

    .body {
      padding-left: 15px !important;
      padding-right: 15px !important;

      .title {
        margin-bottom: 5px;
        color: #888894;
        padding: 5px 0;
      }

      .count {
        font-size: 16px;
        color: #333;
        overflow: hidden;
      }
    }

    .footer {
      -webkit-tap-highlight-color: transparent;
      display: block;
      margin-top: 6px !important;
      height: 4px;
    }
  }
}

.wallet-box {
  display: block;
  padding: 8px 0 !important;
  margin-top: 15px !important;
  margin-bottom: 15px !important;
  box-shadow: 0 0 26px 0 rgba(34, 34, 44, 0.06);
  border-radius: 30px;

  .wallet-header {
    margin: 12px 15px 6px !important;

    .wallet-content {
      background-color: #f7f7f7;
      padding: 6px !important;
      padding-left: 15px !important;
      padding-right: 15px !important;
      box-shadow: inset 5px 5px 10px #d9d9d9;
      border-radius: 10px;
      position: relative;

      .top {
        font-size: 20px;
        color: #333;
        margin-top: 6px !important;
      }

      .bottom {
        font-size: 12px;
        color: #888894;
        margin-top: 6px !important;
      }
    }
  }
}
</style>
