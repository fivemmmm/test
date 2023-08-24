<template>
  <div class="tool">
    <el-icon size="16"><House /></el-icon>
    <el-icon size="16"><FullScreen /></el-icon>
    <el-icon size="16"><Picture /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.tool {
  height: 120px;
  width: 40px;
  background-color: #efefef;
  border-radius: 11px;
  border: 1px solid #bbbbbb;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  right: 20px;
  bottom: 30px;
}
</style>
