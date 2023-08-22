<script setup>
import { ref } from "vue";
import { isHidden } from "@/composables/changeVisible";
import { isShow } from "@/composables/changeVisible";

const data = ref([
  {
    id: 0,
    dataName: "河流",
    status: false,
  },
  {
    id: 1,
    dataName: "镇区水功能考核断面",
    status: false,
  },
  {
    id: 2,
    dataName: "简化行政村",
    status: false,
  },
  {
    id: 3,
    dataName: "简化镇",
    status: false,
  },
]);
</script>

<template>
  <div class="title-name" @click="isShow('resource-directory')">
    <div>资源目录</div>
  </div>
  <div class="resource-directory">
    <div class="title">
      资源面板
      <el-icon
        size="20"
        color="#F4BF4E"
        @click="isHidden('resource-directory'), isShow('title-name')"
        ><RemoveFilled />
      </el-icon>
    </div>
    <div>
      <div class="data" v-for="item in data" :key="item.id">
        <div :class="{ show: item.status == true }">{{ item.dataName }}</div>
        <el-switch v-model="item.status" @change="changeStatus($event, item)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div {
  text-align: center;
}
.title-name {
  height: 150px;
  width: 40px;
  border-radius: 30px;
  font: 20px bold;
  padding: auto 0;
  border: 1px solid #bbbbbb;
  background-color: #efefef;

  position: absolute;
  left: 18px;
  top: 300px;
  div {
    margin: 20px 0;
  }
}
.resource-directory {
  height: 720px;
  border-radius: 35px;
  border: 1px solid #bbbbbb;
  background-color: #efefef;

  position: absolute;
  left: 18px;
  top: 76px;

  .title {
    width: 320px;
    height: 34px;
    margin-top: 20px;
    font: 20px bold;
    text-align: center;
    .el-icon {
      position: relative;
      top: 5px;
      left: 90px;
    }
  }

  .data {
    padding: 0 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: #a8cfff;
    }

    .show {
      color: $xtxColor;
    }
  }
}
</style>
