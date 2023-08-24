<script setup>
import * as echarts from "echarts";
import { ref } from "vue";

import { getQualityList } from "./stores/getQualityList";

const source = [
  {
    Year: 2016,
    Quarter: 2,
    Date: "2016/02",
    AmmoniaNitrogen: "0.086",
    TotalPhosphorus: "0.026",
    PermanganateIndex: "32",
    DissolvedOxygen: "7.7",
    达标情况: "达标",
  },
  {
    Year: 2016,
    Quarter: 3,
    Date: "2016/03",
    AmmoniaNitrogen: "0.086",
    TotalPhosphorus: "0.026",
    PermanganateIndex: "32",
    DissolvedOxygen: "7.7",
    达标情况: "达标",
  },
  {
    Year: 2016,
    Quarter: 4,
    Date: "2016/04",
    AmmoniaNitrogen: "0.086",
    TotalPhosphorus: "0.026",
    PermanganateIndex: "32",
    DissolvedOxygen: "7.7",
    达标情况: "达标",
  },
  {
    Year: 2017,
    Quarter: 1,
    Date: "2016/05",
    AmmoniaNitrogen: "0.086",
    TotalPhosphorus: "0.026",
    PermanganateIndex: "32",
    DissolvedOxygen: "7.7",
    达标情况: "达标",
  },
];

const option = ref({
  legend: {
    formatter: function (name) {
      if (name === "AmmoniaNitrogen") {
        return "氨氮(mg/l)";
      } else if (name === "TotalPhosphorus") {
        return "总磷(mg/l)";
      } else if (name === "PermanganateIndex") {
        return "高锰酸钾(mg/l)";
      } else if (name === "DissolvedOxygen") {
        return "溶解氧(mg/l)";
      }
      return name; // 其他键名保持不变
    },
  },
  tooltip: {},
  dataset: {
    dimensions: [
      "Date",
      "AmmoniaNitrogen",
      "TotalPhosphorus",
      "PermanganateIndex",
      "DissolvedOxygen",
    ],
    source: source,
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  series: [
    { type: "line" },
    { type: "line" },
    { type: "line" },
    { type: "line" },
  ],
});
const getQuality = async () => {
  const res = await getQualityList("上兴镇", "库中", "竹林水库");
  const qualityList = res.qualityList;
  console.log(qualityList);

  console.log("source.value", option.value.dataset.source);
  option.value.dataset.source = qualityList;
  console.log("source.value", option.value.dataset.source);
};

const getline = () => {
  const chartDom = document.getElementById("main");
  const myChars = echarts.init(chartDom);
  console.log("option", option);
  myChars.setOption(option.value);
  debugger;
};
</script>

<template>
  <!-- 一级路由出口组件 -->
  <RouterView />
  <div class="button1" @click="getQuality(), getline()">点</div>
  <div class="button" @click="getline()"></div>
  <div id="main" style="width: 963px; height: 300px"></div>

  <div class="test">test scss</div>
</template>

<style scoped lang="scss">
.button1 {
  height: 50px;
  width: 50px;
  background-color: #f10707;
}
.button {
  height: 50px;
  width: 50px;
  background-color: #000;
}
.search {
  height: 300px;
  width: 300px;
  position: absolute;

  right: 500px;
  .point {
    background-color: #b2b2b2;
  }
}
html,
body {
  padding: 0;
  width: 100%;
  min-height: 100px;
}
.test {
  color: $priceColor;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
