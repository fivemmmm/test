<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
const data = [
  {
    id: 1,
    name: "省份",
    status: 0,
  },
  {
    id: 2,
    name: "市州",
    status: 0,
  },
  {
    id: 3,
    name: "区县",
    status: 0,
  },
  {
    id: 4,
    name: "街道",
    status: 1,
  },
  {
    id: 5,
    name: "乡村",
    status: 1,
  },
];
</script>
<template slot-scope="scope">
  <LayoutHeader />
  <div
    class="ss"
    v-for="item in data"
    :key="item.id"
    :label="item.name"
    style="display: inline-block"
  >
    <el-switch
      v-model="item.status"
      :active-value="0"
      :inactive-value="1"
      :name="item.name"
      @change="handleSwitch($event, item)"
    ></el-switch>
  </div>
</template>

<style scoped lang="scss"></style>
