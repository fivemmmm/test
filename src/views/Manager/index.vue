<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { onMounted, ref } from "vue";
import { exportDictValue } from "@/composables/exportDictValue";

const radio1 = ref("行政区划");
const log = () => {
  console.log(radio1);
};

import { getTownshipList } from "@/stores/getTownshipList";
const getTownship = async () => {
  const res = await getTownshipList();
  return exportDictValue(res.townshipList).then((result) => {
    const townshipList = result.dictList;
    return townshipList;
  });
};

const list = ref([]);
getTownship().then((townshipList) => {
  list.value = townshipList;
  console.log(list.value);
});

import { getSectionList } from "@/stores/getSectionList";
const getSection = async (townshipName) => {
  const res = await getSectionList(townshipName);
  const sectionList = res.sectionList;
};

import { getRiverList } from "@/stores/getRiverList";
const getRiver = async (townshipName, activeSectionName) => {
  const res = await getRiverList(townshipName, activeSectionName);
  const riverList = res.riverList;
};

onMounted(() => {
  getTownship(), getRiver(), getSection();
});
</script>
<template>
  <LayoutHeader />

  <div class="common-layout">
    <el-container>
      <el-aside width="400px"
        >Aside
        <el-radio-group v-model="radio1" size="large" @click="log()">
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
        <div v-for="item in list" :key="item.Township">
          {{ item.Township }}
        </div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  height: 789px;
}
</style>
