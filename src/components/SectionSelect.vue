<script setup>
import { ref } from "vue";
import { isHidden } from "@/composables/changeVisible";
import { isShow } from "@/composables/changeVisible";

//改变图标颜色
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
const activeSectionName = ref("");
const activeRiverName = ref("");

const changeSectionColor = (item) => {
  activeSectionName.value = item.SectionName;
};
const changeRivernColor = (item) => {
  activeRiverName.value = item.RiverName;
};
// 点击 关闭图标 重置activeName
const changeName = () => {
  activeSectionName.value = "";
  activeRiverName.value = "";
  year.value = "";
};
// 站点管理
// 获取镇数据列表
import { useTownshipList } from "@/stores/getTownshipList";
const { townshipList } = useTownshipList();
const townshipName = ref();
// 获取断点数据列表
import { getSectionList } from "@/stores/getSectionList";
const sectionList = ref([]);
const getSection = async (townshipName) => {
  riverList.value = [];
  const res = await getSectionList(townshipName);
  sectionList.value = res.sectionList;
};
//获取河流名称
import { getRiverList } from "@/stores/getRiverList";

const riverList = ref([]);
const getRiver = async (townshipName, activeSectionName) => {
  const res = await getRiverList(townshipName, activeSectionName);
  riverList.value = res.riverList;
};
//表格
const year = ref("");

const options = [
  {
    value: 2016,
    label: "2016",
  },
  {
    value: 2017,
    label: "2017",
  },
  {
    value: 2018,
    label: "2018",
  },
  {
    value: 2019,
    label: "2019",
  },
];
import { getQualityList } from "@/stores/getQualityList";
import { defineEmits } from "vue";
const emit = defineEmits(["getQualityData"]);
const postNull = () => {
  emit("getQualityData", "");
};
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

  emit("getQualityData", res);
};

defineProps({
  titleName: String,
  default: () => "cfsf",
});
</script>

<template>
  <!-- 站点管理 -->
  <!-- 站点管理图标 -->
  <div
    class="manager"
    @click="(isVisible = !isVisible), changeColor(isVisible)"
  >
    <el-icon :size="16"><Search /></el-icon>
  </div>
  <!-- 站点管理列表 -->
  <div class="search" v-show="isVisible">
    站点管理
    <el-select
      v-model="townshipName"
      class="m-2"
      filterable
      placeholder="行政区选择"
    >
      <el-option
        v-for="item in townshipList"
        :key="item.Township"
        :label="item.Township"
        :value="item.Township"
        @click="
          changeName();
          getSection(townshipName);
          postNull();
        "
      />
    </el-select>
    断面列表
    <div class="point-groups">
      <div
        class="point"
        :class="{ active: item.SectionName == activeSectionName }"
        :style="{ backgroundColor: item.color }"
        v-for="item in sectionList.value"
        :key="item.SectionName"
        @click="
          changeName();
          changeSectionColor(item),
            isShow('query'),
            getRiver(townshipName, activeSectionName);
          postNull();
        "
      >
        {{ item.SectionName }}
      </div>
    </div>
    河流列表
    <div class="point-groups">
      <div
        class="point"
        :class="{ active: item.RiverName == activeRiverName }"
        :style="{ backgroundColor: item.color }"
        v-for="item in riverList.value"
        :key="item.RiverName"
        @click="
          changeRivernColor(item),
            isShow('query'),
            getQuality(townshipName, activeSectionName, activeRiverName)
        "
      >
        {{ item.RiverName }}
      </div>
    </div>
  </div>
  <!-- 查询结果表格 -->
  <div class="query">
    <div class="query-title">
      <div>
        <strong class="title-name">{{ titleName }}</strong> {{ "&nbsp;"
        }}{{ townshipName }} {{ activeSectionName }} {{ activeRiverName }}
      </div>

      <div>
        <el-select v-model="year" class="m-2" placeholder="检测年份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="
              getQuality(townshipName, activeSectionName, activeRiverName, year)
            "
          />
        </el-select>
        <slot class="button" name="buttom"></slot>
        <el-icon
          size="20"
          color="#ff0000"
          @click="isHidden('query'), changeName()"
        >
          <CircleCloseFilled />
        </el-icon>
      </div>
    </div>
    <slot name="el-table"></slot>
  </div>
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

.manager {
  height: 40px;
  width: 40px;
  top: 200px;
  color: #fff;
  border-radius: 11px;
  background-color: $xtxColor;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  right: 20px;
  bottom: 30px;
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
      padding: 2px;

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
  height: 240px;
  width: 1009px;
  background-color: #efefef;
  border: 1px solid #bbb;
  border-radius: 35px;

  z-index: 0;

  position: absolute;
  bottom: 30px;
  right: 70px;
  .title-name {
    text-align: left;
    font-size: 20px;

    display: inline-block;
  }
  .query-title {
    width: 965px;
    height: 20px;
    margin: 20px auto;

    z-index: 5;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-select {
      margin: 0 25px;
    }
    ::v-deep(.el-input.el-input--suffix) {
      .el-input__inner::placeholder {
        color: #3f3e3e;
      }
      .el-input__wrapper {
        width: 100px;
        border-radius: 5px;
        background-color: #efefef;
        border: 1px solid #bbbbbb;
      }
    }
    .el-icon {
      margin: 0 0 0 25px;

      position: relative;
      top: 5px;
      right: 5px;
    }
  }
  // .el-button {
  //   background-color: #0b96f0;
  // }

  // 表格内背景颜色
  ::v-deep(.el-table th) {
    background-color: #fafafa; // 背景透明
  }
}
</style>
