<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import ResourceDirectory from "../../components/ResourceDirectory.vue";
import SectionSelect from "@/components/SectionSelect.vue";
import Tool from "@/components/Tool.vue";

// 表格初始化
const chartContainer = ref(null);
const chart = ref(null);
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
    left: "left",
    top: "60px",
    width: "100px",
  },
  grid: {
    left: "15%",
    right: "2%",
    top: "25%",
    bottom: "10%",
    containLabel: false,
  },
  toolbox: {
    feature: {
      saveAsImage: {
        title: "下载",
      },
    },
    left: "70%",
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
    source: [],
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

// const qualityList = ref([]);
const getQualityList = async (res) => {
  option.value.dataset.source = res.qualityList;
  console.log(res === "");
  if (res === "") {
    option.value.dataset.source = [];
  }

  updateChart();
};
const updateChart = () => {
  if (chart.value) {
    chart.value.setOption(option.value);
  }
};

onMounted(() => {
  chart.value = echarts.init(chartContainer.value);
  chart.value.setOption(option.value);
});
</script>

<template>
  <LayoutHeader />
  <div ref="chartContainer"></div>

  <ResourceDirectory />

  <!-- 站点管理 -->

  <SectionSelect titleName="水质趋势分析" @getQualityData="getQualityList">
    <template v-slot:buttom>
      <el-button type="primary" @click="updateChart()"> 查询 </el-button>
    </template>
    <template v-slot:el-table>
      <div ref="chartContainer" class="chart-container"></div>
    </template>
  </SectionSelect>

  <Tool />
</template>

<style scoped lang="scss">
.active.point {
  color: #fff;
  background-color: #0b96f0; // 设置选中状态下的背景色
  border: 0px solid #000;
}
div {
  text-align: center;
}

.el-button {
  background-color: #0b96f0;
}

.chart-container {
  width: 100%;
  height: 205px;
  position: absolute;
  top: 15px;
  z-index: -1;
}
</style>
