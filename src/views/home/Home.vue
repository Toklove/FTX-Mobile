<script lang="ts" setup>
import { onBeforeMount, reactive, ref, watch } from "vue";
import { getSymbolTrend } from "@/api/home";
import pako from "pako";
import cbImg from "@/assets/img/13.png";
import boxImg from "@/assets/img/8.png";
import keImg from "@/assets/img/ke.png";
import BTCImg from "@/assets/img/BTC.png";
import DataLoading from "@/components/loading/DataLoading.vue";

let socketBtc,
  socketEth,
  socketEos,
  socketBch,
  socketLtc,
  socketXrp,
  socketEtc,
  socketBsv,
  socketDot,
  socketDTB,
  socketTrx,
  socketShib;

const dataIndex = reactive([]);
const dataSuccess = ref(false);

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

function wsGetData() {
  let haurl = "wss://api.huobi.pro/ws";
  let btcArray = {
    sub: "market.btcusdt.kline.1day",
    id: "id1",
  };
  socketBtc = new WebSocket(haurl);
  socketBtc.onopen = function () {
    console.log("connection establish");
    socketBtc.send(JSON.stringify(btcArray));
  };
  socketBtc.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      // console.log(JSON.parse(msg));
      handleData(msg, "BTC");
      dataSuccess.value = true;
    };
    reader.readAsArrayBuffer(blob);
  };
  socketBtc.onclose = function () {
    console.log("connection closed");
  };
}

function usdtMarketWS() {
  let haurl = "wss://api.huobi.pro/ws";
  let btcArray = {
    sub: "market.btcusdt.kline.1day",
    id: "id1",
  };
  socketBtc = new WebSocket(haurl);
  socketBtc.onopen = function () {
    console.log("connection establish");
    socketBtc.send(JSON.stringify(btcArray));
  };
  socketBtc.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      // console.log(JSON.parse(msg));
      handleData(msg, "BTC");
      dataSuccess.value = true;
    };
    reader.readAsArrayBuffer(blob);
  };
  socketBtc.onclose = function () {
    console.log("connection closed");
  };
  ///////////////////////////////////
  let ethArray = {
    sub: "market.ethusdt.detail",
    id: "id2",
  };
  socketEth = new WebSocket(haurl);

  socketEth.onopen = function () {
    //console.log("connection establish");
    socketEth.send(JSON.stringify(ethArray));
  };
  socketEth.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "ETH");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketEth.onclose = function () {
    //console.log('connection closed');
  };
  ///////////////////////////////////////////////////////////
  let eosArray = {
    sub: "market.eosusdt.detail",
    id: "id3",
  };
  socketEos = new WebSocket(haurl);

  socketEos.onopen = function () {
    //console.log("connection establish");
    socketEos.send(JSON.stringify(eosArray));
  };
  socketEos.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "EOS");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketEos.onclose = function () {
    //console.log('connection closed');
  };

  /////////////////////////////////////////////////////////////////
  let bchArray = {
    sub: "market.bchusdt.detail",
    id: "id4",
  };
  socketBch = new WebSocket(haurl);

  socketBch.onopen = function () {
    //console.log("connection establish");
    socketBch.send(JSON.stringify(bchArray));
  };
  socketBch.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "BCH");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketBch.onclose = function () {
    //console.log('connection closed');
  };
  ///////////////////////////////////////////////////
  let ltcArray = {
    sub: "market.ltcusdt.detail",
    id: "id5",
  };
  socketLtc = new WebSocket(haurl);

  socketLtc.onopen = function () {
    //console.log("connection establish");
    socketLtc.send(JSON.stringify(ltcArray));
  };
  socketLtc.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "LTC");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketLtc.onclose = function () {
    //console.log('connection closed');
  };
  ///////////////////////////////////////////////////
  let qtumArray = {
    sub: "market.xrpusdt.detail",
    id: "id6",
  };
  socketXrp = new WebSocket(haurl);

  socketXrp.onopen = function () {
    //console.log("connection establish");
    socketXrp.send(JSON.stringify(qtumArray));
  };
  socketXrp.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "XRP");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketXrp.onclose = function () {
    //console.log('connection closed');
  };
  ///////////////////////////////////////////////////
  let etcArray = {
    sub: "market.etcusdt.detail",
    id: "id7",
  };
  socketEtc = new WebSocket(haurl);

  socketEtc.onopen = function () {
    //console.log("connection establish");
    socketEtc.send(JSON.stringify(etcArray));
  };
  socketEtc.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "ETC");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketEtc.onclose = function () {
    //console.log('connection closed');
  };

  /////////////////////////////////////
  let bsvArray = {
    //DOGE
    sub: "market.dogeusdt.detail",
    id: "id8",
  };
  socketBsv = new WebSocket(haurl);

  socketBsv.onopen = function () {
    //console.log("connection establish");
    socketBsv.send(JSON.stringify(bsvArray));
  };
  socketBsv.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "DOGE");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketBsv.onclose = function () {
    //console.log('connection closed');
  };

  /////////////////////////////////////fil
  let dotArray = {
    sub: "market.filusdt.detail",
    id: "id8",
  };
  socketDot = new WebSocket(haurl);

  socketDot.onopen = function () {
    socketDot.send(JSON.stringify(dotArray));
  };
  socketDot.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "FIL");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketDot.onclose = function () {
    //console.log('connection closed');
  };
  /////
  let dtbArray = {
    sub: "market.dtbusdt.detail",
    id: "id8",
  };
  socketDTB = new WebSocket(haurl);

  socketDTB.onopen = function () {
    //console.log("connection establish");
    socketDTB.send(JSON.stringify(dtbArray));
  };
  socketDTB.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "DTB");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketDTB.onclose = function () {
    //console.log('connection closed');
  };

  /////////////////////////////////////TRX
  let trxArray = {
    sub: "market.trxusdt.detail",
    id: "id8",
  };
  socketTrx = new WebSocket(haurl);

  socketTrx.onopen = function () {
    socketTrx.send(JSON.stringify(trxArray));
  };
  socketTrx.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "TRX");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketTrx.onclose = function () {
    //console.log('connection closed');
  };

  /////////////////////////////////////SHIB
  let shibArray = {
    sub: "market.shibusdt.detail",
    id: "id8",
  };
  socketShib = new WebSocket(haurl);

  socketShib.onopen = function () {
    socketShib.send(JSON.stringify(shibArray));
  };
  socketShib.onmessage = function (event) {
    let blob = event.data;
    let reader = new FileReader();
    reader.onload = function (e) {
      let ploydata = new Uint8Array(e.target.result);
      let msg = pako.inflate(ploydata, { to: "string" });
      handleData(msg, "SHIB");
    };
    reader.readAsArrayBuffer(blob);
  };
  socketShib.onclose = function () {
    //console.log('connection closed');
  };
}

function sendHeartMessage(ping, coinType) {
  if (coinType == "BTC") {
    socketBtc.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "EOS") {
    socketEos.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "BCH") {
    socketBch.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "LTC") {
    socketLtc.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "ETH") {
    socketEth.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "ETC") {
    socketEtc.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "XRP") {
    socketXrp.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "BSV") {
    socketBsv.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "FIL") {
    socketDot.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "TRX") {
    socketDTB.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "SHIB") {
    socketDTB.send(JSON.stringify({ pong: ping }));
  }
  if (coinType == "DTB") {
    socketDTB.send(JSON.stringify({ pong: ping }));
  }
}

function handleReponseData() {}

function handleData(msg, coinType) {
  // console.log(dataIndex);
  let data = JSON.parse(msg);
  if (data.ping) {
    // 如果是 ping 消息
    sendHeartMessage(data.ping, coinType);
  } else if (data.status === "ok") {
    // 响应数据
    handleReponseData();
  } else {
    let str = JSON.stringify(data);
    console.log("当前交易对::::::coinType===" + coinType);
    if (
      coinType == "BTC" ||
      coinType == "ETH" ||
      coinType == "XRP" ||
      coinType == "LTC" ||
      coinType == "DOGE" ||
      coinType == "EOS" ||
      coinType == "FIL" ||
      coinType == "TRX" ||
      coinType == "SHIB"
    ) {
      let jo = JSON.parse(str);
      let tick = jo.tick;
      let amount = tick.amount;
      let open = tick.open;
      let close = tick.close;
      let vol = tick.vol;
      vol = vol.toFixed(2);
      let high = tick.high;
      let low = tick.low;
      let chg = (close - open) / open;

      //console.log(JSON.stringify(dataIndex));
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
}

onBeforeMount(() => {
  getSymbolTrend().then((res) => {
    res.forEach((item) => {
      dataIndex.push(item);
    });
  });
  usdtMarketWS();
});

const images = [
  "https://server.ftx668.vip/storage/images/133a6d73952366f6b9d1dc8d02eb3dd4.png",
];

const list = reactive([
  {
    title: "充币",
    img: cbImg,
  },
  {
    title: "鎖倉挖礦",
    img: boxImg,
  },
  {
    title: "客服",
    img: keImg,
  },
  {
    title: "推广",
    img: boxImg,
  },
  {
    title: "加密货币",
    img: boxImg,
  },
  {
    title: "申購",
    img: boxImg,
  },
]);
</script>

<template>
  <div class="container">
    <van-nav-bar>
      <template #left>
        <van-icon class="color-main" name="user-circle-o" size="25" />
        <p class="header-text">FTX 欢迎您！</p>
      </template>
      <template #right>
        <span class="right-text">简体中文</span>
        <van-icon name="arrow" style="color: rgb(100, 101, 102)" />
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
        <van-col class="data-title" span="12">交易对</van-col>
        <van-col class="data-title" span="5">价格</van-col>
        <van-col class="data-title" span="7">涨幅</van-col>
      </van-row>
      <div v-for="item in dataIndex" v-if="dataSuccess" class="data-item">
        <van-image :src="BTCImg" class="data-icon" />
        <van-row style="width: 100%">
          <van-col class="left" span="12">
            <span class="title">{{ item.symbol }}</span>
            <span class="volume">交易量 {{ item.volume }}</span>
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