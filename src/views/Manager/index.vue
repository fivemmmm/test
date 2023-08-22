<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
</script>
<template>
  <LayoutHeader />
  <el-radio-group v-model="radio1" fill="#c36578">
    <el-radio-button label="fixed" />
    <el-radio-button label="auto" />
  </el-radio-group>
</template>

<style scoped lang="scss"></style>
