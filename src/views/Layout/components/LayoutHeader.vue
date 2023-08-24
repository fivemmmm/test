<script setup></script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/Query">溧阳市水环境管理系统</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink active-class="active" to="/Query">水质查询</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/Analysis">水质分析</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/Evaluate">水质评价</RouterLink>
        </li>
        <li>
          <RouterLink active-class="active" to="/Manager">数据管理</RouterLink>
        </li>
      </ul>
      <ul class="search">
        <li>
          <RouterLink to="/Query">管理中心</RouterLink>
        </li>
        <li>nowDate</li>
        <li>
          <el-icon size="14" color="#fff"><UserFilled /></el-icon>

          <RouterLink to="/Query"> 超级管理员</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #0b96f0;

  .container {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    width: 350px;
    margin: 0 0 0 20px;
    letter-spacing: 5px;
    border-right: 3px solid #fff;
  }

  .app-header-nav {
    width: 700px;
    display: flex;
    // padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 20px;
      width: 125px;
      text-align: center;

      a {
        font-size: 18px;
        line-height: 29px;
        height: 29px;
        width: 105px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-radius: 20px;
          background-color: #fff;
        }
      }

      .active {
        color: $xtxColor;
        border-radius: 20px;
        background-color: #fff;
      }
    }
  }

  .search {
    display: flex;
    font-size: 14px;
    margin-right: 40px;
    text-align: center;
    color: #fff;
    li {
      width: 100px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
