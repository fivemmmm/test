<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { ref } from "vue";
// 引入导出Excel表格依赖
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ResourceDirectory from "../../components/ResourceDirectory.vue";
import SectionSelect from "@/components/SectionSelect.vue";
import Tool from "@/components/Tool.vue";
const exportExcel = (name, id) => {
  var wb = XLSX.utils.table_to_book(document.querySelector("#" + id));
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
};

// 水质查询

const qualityList = ref([]);
const getQualityList = async (res) => {
  qualityList.value = res.qualityList;
};
</script>

<template>
  <LayoutHeader />

  <ResourceDirectory />

  <!-- 站点管理 -->

  <SectionSelect titleName="水质趋势分析" @getQualityData="getQualityList">
    <template v-slot:buttom>
      <el-button
        type="primary"
        @click="exportExcel('上兴镇-库中站点水质数据', 'table')"
      >
        导出
      </el-button>
    </template>
    <template v-slot:el-table>
      <el-table
        id="table"
        :data="qualityList"
        stripe
        style="width: 95%"
        height="180px"
      >
        <el-table-column label="时间">
          <template #default="{ row }">
            {{ row.Year }}/0{{ row.Quarter }}
          </template>
        </el-table-column>
        <el-table-column prop="AmmoniaNitrogen" label="氨氮(mg/l)" />
        <el-table-column prop="TotalPhosphorus" label="总磷(mg/l)" />
        <el-table-column
          prop="PermanganateIndex"
          label="高锰酸钾(mg/l)"
          width="162"
        />
        <el-table-column prop="DissolvedOxygen" label="溶解氧(mg/l)" />
        <el-table-column prop="ComplianceStatus" label="达标情况" />
      </el-table>
    </template>
  </SectionSelect>

  <!-- <div class="tool">
    <el-icon size="16"><House /></el-icon>
    <el-icon size="16"><FullScreen /></el-icon>
    <el-icon size="16"><Picture /></el-icon>
  </div> -->
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

.el-table {
  margin: 0 auto;
}
</style>
