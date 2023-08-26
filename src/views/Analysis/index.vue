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
      } else if (name === "AmmoniaNitrogenStandard") {
        return "氨氮Ⅲ类水标准";
      } else if (name === "TotalPhosphorus") {
        return "总磷(mg/l)";
      } else if (name === "TotalPhosphorusStandard") {
        return "总磷Ⅲ类水标准";
      } else if (name === "PermanganateIndex") {
        return "高锰酸盐(mg/l)";
      } else if (name === "PermanganateIndexStandard") {
        return "高锰酸盐Ⅲ类水标准";
      } else if (name === "DissolvedOxygen") {
        return "溶解氧(mg/l)";
      } else if (name === "DissolvedOxygenStandard") {
        return "溶解氧Ⅲ类水标准";
      }
      return name; // 其他键名保持不变
    },
    left: "left",
    top: "25px",
    width: "100px",
  },
  grid: {
    left: "17%",
    right: "2%",
    top: "25%",
    bottom: "10%",
    containLabel: false,
  },
  tooltip: {},
  dataset: {
    dimensions: [
      "Date",
      "AmmoniaNitrogen",
      "AmmoniaNitrogenStandard",
      "TotalPhosphorus",
      "TotalPhosphorusStandard",
      "PermanganateIndex",
      "PermanganateIndexStandard",
      "DissolvedOxygen",
      "DissolvedOxygenStandard",
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
    { type: "line" },
    { type: "line" },
    { type: "line" },
    { type: "line" },
  ],
});

// const qualityList = ref([]);
const getQualityList = async (res) => {
  option.value.dataset.source = res.qualityList;
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
  const bindingMap = {
    AmmoniaNitrogen: ["AmmoniaNitrogen", "AmmoniaNitrogenStandard"],
    AmmoniaNitrogenStandard: ["AmmoniaNitrogen", "AmmoniaNitrogenStandard"],
    TotalPhosphorus: ["TotalPhosphorus", "TotalPhosphorusStandard"],
    TotalPhosphorusStandard: ["TotalPhosphorus", "TotalPhosphorusStandard"],
    PermanganateIndex: ["PermanganateIndex", "PermanganateIndexStandard"],
    PermanganateIndexStandard: [
      "PermanganateIndex",
      "PermanganateIndexStandard",
    ],
    DissolvedOxygen: ["DissolvedOxygen", "DissolvedOxygenStandard"],
    DissolvedOxygenStandard: ["DissolvedOxygen", "DissolvedOxygenStandard"],
    // ... (other binding relationships if needed)
  };
  chart.value.setOption(option.value);
  chart.value.on("legendselectchanged", (params) => {
    const { selected, name } = params;

    const bindingSeries = bindingMap[name];

    if (bindingSeries) {
      // Toggle the binding series together
      bindingSeries.forEach((seriesName) => {
        selected[seriesName] = selected[name];
      });
    }

    chart.value.setOption({
      legend: { selected },
    });
  });
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
