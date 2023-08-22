<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { onMounted, ref } from "vue";
// 引入导出Excel表格依赖
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import { isHidden } from "@/composables/changeVisible";
import { isShow } from "@/composables/changeVisible";
import ResourceDirectory from "../../components/ResourceDirectory.vue";
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

const isVisible = ref(true);
const changeColor = (isVisible) => {
  let byClass = document.getElementsByClassName("manager")[0].style;
  if (isVisible == true) {
    byClass.background = "#0B96F0";
    byClass.color = "#fff";
    byClass.border = "0px solid #000";
  } else {
    byClass.background = "#fff";
    byClass.color = "#000";
    byClass.border = "1px solid #bbbbbb";
  }
};

// const isHidden = (className) => {
//   let byClass = document.getElementsByClassName(className)[0].style;
//   byClass.display = "none";
//   if (className == "query") {
//     let byClass1 = document.getElementsByClassName("point");
//     for (let i = 0; i < byClass1.length; i++) {
//       byClass1[i].style.background = "#efefef";
//       byClass1[i].style.color = "#000";
//     }
//   }
// };
// const isShow = (className, id) => {
//   let byClass = document.getElementsByClassName(className)[0].style;
//   byClass.display = "block";
//   if (className == "query") {
//     let byClass1 = document.getElementsByClassName("point");
//     for (let i = 0; i < byClass1.length; i++) {
//       byClass1[i].style.background = "#efefef";
//       byClass1[i].style.color = "#000";
//     }
//     let byClass = document.getElementsByClassName("point")[id - 1].style;
//     byClass.background = "#0B96F0";
//     byClass.color = "#fff";
//   }
// };
// const data = ref([
//   {
//     id: 0,
//     dataName: "河流",
//     status: false,
//   },
//   {
//     id: 1,
//     dataName: "镇区水功能考核断面",
//     status: false,
//   },
//   {
//     id: 2,
//     dataName: "简化行政村",
//     status: false,
//   },
//   {
//     id: 3,
//     dataName: "简化镇",
//     status: false,
//   },
// ]);
// const value1 = ref(false);
// const value2 = ref(false);
// const value3 = ref(false);
// const value4 = ref(false);

// const status = ref(false);

// const changeStatus = ($event, item) => {
//   // status.value = $event;
//   console.log(item, data);
// };
// 站点管理

import { useTownshipList } from "@/composables/getTownshipList";
const { townshipList } = useTownshipList();
// const townshipList = ref([]);
// import { search } from "@/apis/search";
// const getTownshipList = async () => {
//   const res = await search();
//   for (let i = 0; i < res.data.length; i++) {
//     townshipList.value.push({
//       Township: res.data[i].Township,
//     });
//   }
//   const unique = (arr) => {
//     const res = new Map();
//     return arr.filter(
//       (arr) => !res.has(arr.Township) && res.set(arr.Township, 1)
//     );
//   };
//   let arr1 = unique(townshipList.value);
//   townshipList.value = arr1;
//   console.log(townshipList);
//   console.log(townshipList.value.length);
//   for (let i = 0; i < townshipList.value.length; i++) {
//     console.log(townshipList.value[i]);
//   }
// };

const pointGroup = [
  {
    id: 1,
    SectionName: "堑口",
  },
  {
    id: 2,
    SectionName: "上兴街桥",
  },
  {
    id: 3,
    SectionName: "库中",
  },
  {
    id: 4,
    SectionName: "东塘桥",
  },
];

// 水质查询
// axios.get("/cat/1").then((res) => {
//   console.log(res.data);
// });
const qualityData = ref({});
const getData = async (id = 1) => {
  const res = await axios.get(`/cat/${id}`);
  qualityData.value = res.data;
};
getData();
const tableData = [
  {
    date: "2016/02",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/04",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/05",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/06",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/07",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/08",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
  {
    date: "2016/09",
    "氨氮(mg/l)": "0.086",
    "总磷(mg/l)": "0.026",
    "高锰酸钾(mg/l)": "32",
    "溶解氧(mg/l)": "7.7",
    达标情况: "达标",
  },
];
</script>

<template>
  <LayoutHeader />
  <ResourceDirectory />
  <!-- <div class="title-name" @click="isShow('resource-directory')">
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
  </div> -->
  <!-- 站点管理 -->
  <div
    class="tool manager"
    @click="(isVisible = !isVisible), changeColor(isVisible)"
  >
    <el-icon :size="16"><Search /></el-icon>
  </div>
  <div class="search" v-show="isVisible">
    站点管理
    <el-select v-model="value" class="m-2" filterable placeholder="行政区选择">
      <el-option
        v-for="item in townshipList"
        :key="item.Township"
        :label="item.Township"
        :value="item.Township"
      />
    </el-select>
    站点列表
    <div class="point-groups">
      <div
        class="point"
        v-for="item in pointGroup"
        :key="item.id"
        @click="isShow('query', item.id)"
      >
        {{ item.SectionName }}
      </div>
    </div>
  </div>
  <div class="query">
    <div class="query-title">
      上兴镇 竹林水库 库中
      <div>
        <el-button
          type="primary"
          @click="exportExcel('上兴镇-库中站点水质数据', 'table')"
          >导出</el-button
        >
        <el-icon size="20" color="#ff0000" @click="isHidden('query')"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>
    <el-table
      id="table"
      :data="tableData"
      stripe
      style="width: 95%"
      height="160"
    >
      <el-table-column prop="date" label="时间" />
      <el-table-column prop="氨氮(mg/l)" label="氨氮(mg/l)" />
      <el-table-column prop="总磷(mg/l)" label="总磷(mg/l)" />
      <el-table-column
        prop="高锰酸钾(mg/l)"
        label="高锰酸钾(mg/l)"
        width="162"
      />
      <el-table-column prop="溶解氧(mg/l)" label="溶解氧(mg/l)" />
      <el-table-column prop="达标情况" label="达标情况" />
    </el-table>
  </div>
  <div class="tool">
    <el-icon size="16"><House /></el-icon>
    <el-icon size="16"><FullScreen /></el-icon>
    <el-icon size="16"><Picture /></el-icon>
  </div>
</template>

<style scoped lang="scss">
div {
  text-align: center;
}

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
.manager {
  height: 40px;

  border: 0;
  top: 200px;
  color: #fff;
  background-color: $xtxColor;
}
.search {
  width: 230px;
  background-color: #efefef;
  border-radius: 35px;
  border: 1px solid #bbb;
  text-align: center;
  font: 20px bolder;
  padding: 14px;

  display: flex;
  flex-direction: column;

  position: absolute;
  right: 70px;
  top: 80px;
  .el-select {
    margin: 15px 0;
  }
  ::v-deep(.el-input.el-input--suffix) {
    .el-input__inner::placeholder {
      color: #3f3e3e;
    }
    .el-input__wrapper {
      border-radius: 10px;
      background-color: #efefef;
      border: 1px solid #bbbbbb;
    }
  }

  .point-groups {
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;

    .point {
      height: 25px;
      width: 90px;
      border: 1px solid #bbb;
      border-radius: 10px;
      font: 14px normal;

      margin-right: 20px;
      margin-bottom: 10px;
      &:nth-last-child(-n + 2) {
        margin-bottom: 0;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
.query {
  height: 230px;
  width: 1009px;
  background-color: #efefef;
  border: 1px solid #bbb;
  border-radius: 35px;

  position: absolute;
  bottom: 30px;
  right: 70px;

  .query-title {
    width: 965px;
    height: 20px;
    margin: 15px auto 20px;

    justify-content: space-between;
    text-align: center;
    display: flex;
  }
  .el-button {
    background-color: #0b96f0;
  }
  .el-icon {
    margin: 0 0 0 25px;

    position: relative;
    top: 5px;
    right: 5px;
  }
  .el-table {
    margin: 0 auto;
  }
  // 表格内背景颜色
  ::v-deep(.el-table th) {
    background-color: #fafafa; // 背景透明
  }
}
</style>
