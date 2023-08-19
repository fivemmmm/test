<script setup>
import { ref } from "vue";

const value1 = ref(true);

import LayoutHeader from "../Layout/components/LayoutHeader.vue";
</script>
<template>
  <LayoutHeader />
  <div class="resource-directory">
    <div class="" style="width: 320px">
      <div style="height: 34px; display: flex; margin-top: 20px">
        <div style="position: relative; left: 40%">资源面板</div>
        <el-icon size="20" color="#F4BF4E" style="position: relative; left: 70%"
          ><RemoveFilled />
        </el-icon>
      </div>
      <div style="display: flex; justify-content: center">
        <div
          style="width: 283px; display: flex; justify-content: space-between"
        >
          <div>河流</div>
          <el-switch v-model="value1" />
        </div>
      </div>
    </div>
  </div>

  <div class="tool">
    <el-icon size="16"><House /></el-icon>
    <el-icon size="16"><FullScreen /></el-icon>
    <el-icon size="16"><Picture /></el-icon>
  </div>
  <div class="tool manager">
    <el-icon @click="fck"><Search /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.resource-directory {
  height: 700px;
  width: 320px;
  border-radius: 35px;
  border: 1px solid #bbbbbb;
  position: absolute;
  left: 18px;
  top: 76px;
  display: flex;
  justify-content: space-between;
}
.tool {
  background-color: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 120px;
  width: 40px;
  border-radius: 11px;
  border: 1px solid #bbbbbb;
}
.manager {
  height: 40px;
  .active {
    color: $xtxColor;
    border-radius: 20px;
    background-color: #fff;
  }
}
</style>
