<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { onMounted, ref } from "vue";
import { exportDictValue } from "@/composables/exportDictValue";

const radio1 = ref("行政区划");
const activeList = ref([]);
const optionMap = {
  行政区划: "getTownship",
  断面名称: "getSection",
  河流名称: "getRiver",
};
const changeActiveList = () => {
  const selectedOption = optionMap[radio1.value];
  if (selectedOption) {
    const getFunction = eval(selectedOption);
    getFunction().then((list) => {
      activeList.value = list;
    });
  }
};

import { getTownshipList } from "@/stores/getTownshipList";
const getTownship = async () => {
  const res = await getTownshipList();
  return exportDictValue(res.townshipList, "Township").then((result) => {
    const townshipList = result.dictList;
    return townshipList;
  });
};

import { getSectionList } from "@/stores/getSectionList";
const getSection = async () => {
  const res = await getSectionList();
  return exportDictValue(res.sectionList, "SectionName").then((result) => {
    const sectionList = result.dictList;
    return sectionList;
  });
};

import { getRiverList } from "@/stores/getRiverList";
const getRiver = async () => {
  const res = await getRiverList();
  return exportDictValue(res.riverList, "RiverName").then((result) => {
    const riverList = result.dictList;
    return riverList;
  });
};

const activeName = ref("");
const changeName = (item) => {
  activeName.value = item;
  console.log(activeName);
};

import { getQualityList } from "@/stores/getQualityList";

const getQuality = async (
  townshipName,
  activeSectionName,
  activeRiverName,
  year
) => {
  let res = await getQualityList(
    townshipName,
    activeSectionName,
    activeRiverName,
    year
  );
  return res;
};

const qualityList = ref([]);
onMounted(() => {
  changeActiveList(radio1.value);
  getQuality().then((result) => {
    const res = result;
    qualityList.value = res.qualityList;
  });
});
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
zhCn.el.pagination = {
  goto: "跳转至",
  pageClassifier: "",
  pagesize: "",
  total: "共 {total} 条",
};
</script>
<template>
  <LayoutHeader />

  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-radio-group
          text-color="#fff"
          v-model="radio1"
          @change="changeActiveList(radio1)"
        >
          <el-radio-button label="行政区划">
            <strong>行政区划</strong>
          </el-radio-button>
          <el-radio-button label="断面名称">
            <strong>断面名称</strong>
          </el-radio-button>
          <el-radio-button label="河流名称">
            <strong>河流名称</strong>
          </el-radio-button>
        </el-radio-group>
        <div class="list">
          <div
            :class="{ active: item == activeName }"
            v-for="item in activeList"
            :key="item"
            @click="changeName(item)"
          >
            {{ item }}
          </div>
        </div>
      </el-aside>
      <el-main>
        <el-container>
          <el-header>Header</el-header>
          <el-main
            ><el-table
              id="table"
              :data="qualityList"
              stripe
              style="width: 95%"
              height="500"
              :default-sort="{
                prop: 'Township,SectionName,RiverName,Date',
                order: 'descending',
              }"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                prop="Township"
                label="镇区"
                sortable
                width="90"
              />
              <el-table-column
                prop="SectionName"
                label="断面名称"
                sortable
                width="110"
              />
              <el-table-column
                prop="RiverName"
                label="河流名称"
                sortable
                width="110"
              />
              <el-table-column prop="Date" label="日期" sortable width="90" />

              <el-table-column prop="AmmoniaNitrogen" label="氨氮(mg/l)" />
              <el-table-column prop="TotalPhosphorus" label="总磷(mg/l)" />
              <el-table-column
                prop="PermanganateIndex"
                label="高锰酸盐(mg/l)"
                width="130px"
              />
              <el-table-column
                prop="DissolvedOxygen"
                label="溶解氧(mg/l)"
                width="130px"
              />
              <el-table-column prop="ComplianceStatus" label="达标情况" />
            </el-table>
            <el-config-provider :locale="$commonLang('customPagination')">
              <el-pagination
                small
                :hide-on-single-page="true"
                background
                layout="prev, pager, next,total"
                :total="100"
              />
            </el-config-provider>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.active {
  color: #fff;
  background-color: #0b96f0; // 设置选中状态下的背景色
  border: 0px solid #000;
}
.common-layout {
  height: 789px;

  .el-aside {
    height: 720px;
    width: 320px;
    border-radius: 35px;
    border: 1px solid #bbbbbb;

    margin: 37px 18px 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    .el-radio-group {
      margin: 20px auto;

      ::v-deep(.el-radio-button__inner) {
        color: #409eff;
      }
    }
    .list {
      width: 200px;
      font: 14px bold;
      text-align: center;

      display: flex;
      flex-wrap: wrap;
      align-items: center;

      div {
        height: 22px;
        width: 90px;
        border: 1px solid #bbb;
        border-radius: 10px;

        margin-right: 20px;
        margin-bottom: 10px;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }

  .el-main {
    height: 720px;
    border-radius: 35px;

    margin: 37px 18px 0 0;
    padding: 0;
    .el-main {
      height: 658px;
      width: 100%;
      border-radius: 35px;
      border: 1px solid #bbbbbb;

      margin: 0;

      .el-table {
        margin: 20px auto;
      }
    }
  }
}
</style>
