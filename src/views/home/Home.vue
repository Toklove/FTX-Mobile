<script lang="ts" setup>
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { getSymbolTrend } from "@/api/home";
import pako from "pako";
import cbImg from "@/assets/img/13.png";
import boxImg from "@/assets/img/8.png";
import keImg from "@/assets/img/ke.png";
import BTCImg from "@/assets/img/BTC.png";
import DataLoading from "@/components/loading/DataLoading.vue";
import { defaultStore } from "@/store/testPinia";
import { useI18n } from "vue-i18n";

const dataIndex = reactive([]);
const dataSuccess = ref(false);
const store = defaultStore();

const stockList = ref([]);
watch(dataIndex, () => {
  stockList.value = dataIndex.filter((item) => {
    return (
      item.symbol === "BTC/USDT" ||
      item.symbol === "ETH/USDT" ||
      item.symbol === "LTC/USDT"
    );
  });
});

function initWsData() {
  if (dataIndex.length < 1) {
    setTimeout(() => {
      initWsData();
    }, 1e3);
    return;
  }
  let haurl = "wss://api.btcgateway.pro/linear-swap-ws";
  dataIndex.forEach((item, index) => {
    let str = item.symbol.replace("/", "-");
    let subArray = {
      sub: `market.${str}.kline.1day`,
      id: "id" + index
    };
    let socket = new WebSocket(haurl);
    socket.onopen = function() {
      console.log("connection establish");
      socket.send(JSON.stringify(subArray));
    };
    socket.onmessage = function(event) {
      let blob = event.data;
      let reader = new FileReader();
      reader.onload = function(e) {
        let ploydata = new Uint8Array(e.target.result);
        let msg = pako.inflate(ploydata, { to: "string" });
        dataHandler(msg, str.split("-")[0], socket);
        dataSuccess.value = true;
      };
      reader.readAsArrayBuffer(blob);
    };
  });
}


function dataHandler(msg, coinType, socket) {
  // console.log(dataIndex);
  let data = JSON.parse(msg);
  if (data.ping) {
    // 如果是 ping 消息
    socket.send(JSON.stringify({ pong: data.ping }));
  } else if (!data.status) {
    let str = JSON.stringify(data);
    console.log(data);
    let jo = JSON.parse(str);
    let tick = jo.tick;
    // let amount = tick.amount;
    let open = tick.open;
    let close = tick.close;
    let vol = tick.vol;
    vol = vol.toFixed(2);
    let high = tick.high;
    let low = tick.low;
    let chg = (close - open) / open;
    if (dataIndex != null && dataIndex.length > 0) {
      for (let i = 0; i < dataIndex.length; i++) {
        let jo = dataIndex[i];
        let symbol = jo.symbol;
        // console.log("当前symbol===="+symbol);
        let coinTypeStr = coinType + "/USDT";

        if (symbol == coinTypeStr) {
          jo.price = close;
          //console.log("symbol="+symbol+" close="+close);
          //
          jo.close = close;
          jo.highest = high;
          jo.lowest = low;
          jo.volume = vol;
          jo.usdRate = close;
          jo.rose =
            chg > 0
              ? "+" + (chg * 100).toFixed(2) + "%"
              : (chg * 100).toFixed(2) + "%";
        }
      }
    }
  }
}

onBeforeMount(() => {
  getSymbolTrend().then((res) => {
    res.forEach((item) => {
      dataIndex.push(item);
    });
  });
  initWsData();
});
const images = [
  "https://server.ftx668.vip/storage/images/133a6d73952366f6b9d1dc8d02eb3dd4.png"
];

const { t } = useI18n();

const list = computed(() => [
    {
      title: t("home.recharge"),
      img: cbImg
    },
    {
      title: t("home.lockedMining"),
      img: boxImg
    },
    {
      title: t("home.service"),
      img: keImg
    },
    {
      title: t("home.promotion"),
      img: boxImg
    },
    {
      title: t("home.crypto"),
      img: boxImg
    },
    {
      title: t("home.sub"),
      img: boxImg
    }
  ]
);

function changeLang() {
  store.showChangeLang = true;
  console.log(store.showChangeLang);
}

</script>

<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon class="color-main" name="user-circle-o" size="25" />
        <p class="header-text">FTX {{ $t("home.welcome") }}！</p>
      </template>
      <template #right>
        <div @click="changeLang">
          <span class="right-text">{{ $t("lang") }}</span>
          <van-icon name="arrow" style="color: rgb(100, 101, 102)" />
        </div>
      </template>
    </van-nav-bar>
    <div class="py-3 px-3">
      <van-swipe :autoplay="3000" class="banner" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <van-image :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="py-3 px-3">
      <van-notice-bar
        background="#fff"
        class="box-shadow notice"
        color="#666"
        left-icon="volume-o"
      >
        FTX全民狂欢季，史上最强福利火爆开启！
      </van-notice-bar>
    </div>
    <div class="px-3">
      <van-row>
        <van-col
          v-for="item in list"
          :key="item.title"
          class="cell-item"
          span="8"
        >
          <van-image :src="item.img" class="cell-img" />
          <span class="cell-title">{{ item.title }}</span>
        </van-col>
      </van-row>
    </div>
    <div class="px-3 stock">
      <van-row>
        <van-col v-for="item in stockList" class="stock-item" span="8">
          <span class="stock-symbol">{{ item.symbol }}</span>
          <span
            :class="parseFloat(item.rose) < 0 ? 'color-sell' : 'color-buy'"
            class="stock-price"
          >{{ item.price }}</span
          >
          <span
            :class="parseFloat(item.rose) < 0 ? 'color-sell' : 'color-buy'"
            class="stock-rose"
          >{{ item.rose }}</span
          >
        </van-col>
      </van-row>
    </div>
    <div class="px-3 box-shadow text-again-center text-grey data-list">
      <van-row style="padding: 10px 0">
        <van-col class="data-title" span="12">{{ t("home.trading") }}</van-col>
        <van-col class="data-title" span="5">{{ t("home.price") }}</van-col>
        <van-col class="data-title" span="7">{{ t("home.growth") }}</van-col>
      </van-row>
      <div v-for="item in dataIndex" v-if="dataSuccess" class="data-item">
        <van-image :src="BTCImg" class="data-icon" />
        <van-row style="width: 100%">
          <van-col class="left" span="12">
            <span class="title">{{ item.symbol }}</span>
            <span class="volume">{{ t("home.amount") }} {{ item.volume }}</span>
          </van-col>
          <van-col class="center" span="6">
            <span
              :class="parseFloat(item.rose) < 0 ? 'color-sell' : 'color-buy'"
            >{{ item.price }}</span
            >
          </van-col>
          <van-col class="right" span="6">
            <div
              :class="parseFloat(item.rose) < 0 ? 'bg-sell' : 'bg-buy'"
              class="block"
            >
              {{ item.rose }}
            </div>
          </van-col>
        </van-row>
      </div>
      <DataLoading v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-grey {
  color: #666;
}

h1 {
  display: block;
  font-size: 40px;
  text-align: center;
  padding: 20px 0;
}

ul {
  li {
    display: block;
    font-size: 20px;
    padding: 20px 0;
    text-align: center;
  }
}

.header-text {
  margin-left: 15px;
  font-size: 18px;
}

.right-text {
  font-size: 10px;
}

.banner {
  height: 150px;
  border-radius: 14px;
}

.box-shadow {
  box-shadow: 0 0 26px 0 rgba(34, 34, 44, 0.06);
}

.notice {
  border-radius: 14px;
}

.cell-item {
  margin-top: 8px;
  margin-bottom: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;

  .cell-img {
    height: 33px;
    width: 33px;
  }

  .cell-title {
    margin-top: 10px;
    font-size: 13px;
    color: #666;
  }
}

.data-list {
  display: flex;
  flex-flow: column wrap;

  .data-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .data-item {
    padding: 6px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .data-icon {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }

    .left {
      display: flex;
      flex-flow: column wrap;
      text-align: left !important;

      .title {
        color: #333;
        font-weight: bold;
        font-size: 12px;
      }

      .volume {
        margin-top: 6px;
        font-size: 10px;
      }
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
    }

    .right {
      padding-left: 10px;
      color: white;

      .block {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.stock {
  margin: 20px auto 30px;

  .stock-item {
    text-align: center;
    display: flex;
    flex-flow: column wrap;

    .stock-symbol {
      color: #333;
      font-size: 12px;
    }

    .stock-price {
      margin-top: 10px;
      font-size: 18px;
    }

    .stock-rose {
      margin-top: 16px;
      font-size: 12px;
    }
  }
}
</style>