<script setup>
import LayoutHeader from "../Layout/components/LayoutHeader.vue";
import { onMounted, reactive, ref } from "vue";
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
      console.log(activeList.value);
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
  if (radio1.value === "行政区划") {
    getQuality(item, null, null, year.value);
  } else if (radio1.value === "断面名称") {
    getQuality(null, item, null, year.value);
  } else if (radio1.value === "河流名称") {
    getQuality(null, null, item, year.value);
  }
};

import { getQualityList } from "@/stores/getQualityList";

const getQuality = async (
  townshipName,
  activeSectionName,
  activeRiverName,
  year,
  quarter
) => {
  let res = await getQualityList(
    townshipName,
    activeSectionName,
    activeRiverName,
    year,
    quarter
  ).then((result) => {
    const res = result;
    qualityList.value = res.qualityList;
    console.log(res);
  });
  return res;
};

const qualityList = ref([]);
onMounted(() => {
  changeActiveList(radio1.value);
  getQuality();
  // getQuality().then((result) => {
  //   const res = result;
  //   qualityList.value = res.qualityList;
  // });
});

// 右边工具栏
const year = ref(null);
const optionsOfYear = [
  {
    value: null,
    label: "全部年份",
  },
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
const quarter = ref(null);
const optionsOfQuarter = [
  {
    value: null,
    label: "全部季度",
  },
  {
    value: 1,
    label: "第一季度",
  },
  {
    value: 2,
    label: "第二季度",
  },
  {
    value: 3,
    label: "第三季度",
  },
  {
    value: 4,
    label: "第四季度",
  },
];

const getQualityFromYear = (year) => {
  if (activeName.value === "") {
    getQuality(null, null, null, year);
  } else {
    if (radio1.value === "行政区划") {
      getQuality(activeName.value, null, null, year);
    } else if (radio1.value === "断面名称") {
      getQuality(null, activeName.value, null, year);
    } else if (radio1.value === "河流名称") {
      getQuality(null, null, activeName.value, year);
    }
  }
};

const getQualityFromQuarter = (quarter) => {
  if (activeName.value === "") {
    getQuality(null, null, null, year.value, quarter);
  } else {
    if (radio1.value === "行政区划") {
      getQuality(activeName.value, null, null, year.value, quarter);
    } else if (radio1.value === "断面名称") {
      getQuality(null, activeName.value, null, year.value, quarter);
    } else if (radio1.value === "河流名称") {
      getQuality(null, null, activeName.value, year.value, quarter);
    }
  }
};

const reset = () => {
  getQuality(), (year.value = null);
  quarter.value = null;
  activeName.value = null;
  Quarter;
};

const dialogVisible2 = ref(false);
// 添加数据
const addForm = reactive({
  AmmoniaNitrogen: "",
  ComplianceStatus: "",
  DissolvedOxygen: "",
  PermanganateIndex: "",
  RiverName: "",
  SectionName: "",
  TotalPhosphorus: "",
  Township: "",
  Quarter: "",
  Year: "",
});
const getQualityListLastId = () => {
  getQualityList().then((result) => {
    const qualityListLastId =
      result.qualityList[result.qualityList.length - 1].id;
    addForm.id = qualityListLastId + 1;
    dialogVisible2.value = true;
  });
};

import { addQualityList } from "@/apis/add";
const add = () => {
  console.log(addForm);
  addQualityList(addForm).then(() => {
    if (activeName.value === "") {
      getQuality(null, null, null, year.value, quarter.value);
    } else {
      if (radio1.value === "行政区划") {
        getQuality(activeName.value, null, null, year.value, quarter.value);
      } else if (radio1.value === "断面名称") {
        getQuality(null, activeName.value, null, year.value, quarter.value);
      } else if (radio1.value === "河流名称") {
        getQuality(null, null, activeName.value, year.value, quarter.value);
      }
    }
    changeActiveList();
  });
};

//删除数据
import { deleteQualityList } from "@/apis/delete.js";

let dataonLineListSelections = [];
const selectionLineChangeHandle = (val) => {
  dataonLineListSelections = [];
  for (let i = 0; i < val.length; i++) {
    dataonLineListSelections.push(val[i].id);
  }
  console.log(dataonLineListSelections);
};

const deleteSelected = () => {
  deleteQualityList(dataonLineListSelections).then(() => {
    if (activeName.value === "") {
      getQuality(null, null, null, year.value, quarter.value);
    } else {
      if (radio1.value === "行政区划") {
        getQuality(activeName.value, null, null, year.value, quarter.value);
      } else if (radio1.value === "断面名称") {
        getQuality(null, activeName.value, null, year.value, quarter.value);
      } else if (radio1.value === "河流名称") {
        getQuality(null, null, activeName.value, year.value, quarter.value);
      }
    }
    changeActiveList();
  });
};

// 更新数据
const handleEdit = (row) => {
  (form.id = row.id),
    (form.AmmoniaNitrogen = row.AmmoniaNitrogen),
    (form.ComplianceStatus = row.ComplianceStatus),
    (form.Date = row.Date),
    (form.DissolvedOxygen = row.DissolvedOxygen),
    (form.PermanganateIndex = row.PermanganateIndex),
    (form.RiverName = row.RiverName),
    (form.SectionName = row.SectionName),
    (form.TotalPhosphorus = row.TotalPhosphorus),
    (form.Township = row.Township),
    console.log(form);
};

const dialogVisible = ref(false);
const form = reactive({});

import { updateQualityList } from "@/apis/update";
const update = () => {
  updateQualityList(form).then(() => {
    if (activeName.value === "") {
      getQuality(null, null, null, year.value, quarter.value);
    } else {
      if (radio1.value === "行政区划") {
        getQuality(activeName.value, null, null, year.value, quarter.value);
      } else if (radio1.value === "断面名称") {
        getQuality(null, activeName.value, null, year.value, quarter.value);
      } else if (radio1.value === "河流名称") {
        getQuality(null, null, activeName.value, year.value, quarter.value);
      }
    }
    changeActiveList();
  });
};

const currentPage = ref(1);
const pageSize = 12;

const handleCurrentChange = (val) => {
  currentPage.value = val;
};

import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const locale = zhCn;
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
        <!-- 右侧工具栏 -->
        <el-container>
          <!-- 右侧头部 -->
          <el-header>
            <div>
              <el-select v-model="year" class="m-2" placeholder="监测年份">
                <el-option
                  v-for="item in optionsOfYear"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click="getQualityFromYear(year)"
                />
              </el-select>
              <el-select v-model="quarter" class="m-2" placeholder="监测季度">
                <el-option
                  v-for="item in optionsOfQuarter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click="getQualityFromQuarter(quarter)"
                />
              </el-select>
              <el-button class="reset" type="primary" plain @click="reset()"
                >重置</el-button
              >
              <el-button type="primary">查询</el-button>
            </div>
            <div>
              <el-button type="primary" @click="getQualityListLastId()">
                增加
              </el-button>
              <el-dialog v-model="dialogVisible2" title="添加数据" width="70%">
                <el-form
                  :inline="true"
                  :model="addForm"
                  label-width="50px"
                  label-position="top"
                  size="small"
                >
                  <el-form-item label="镇区">
                    <el-input v-model="addForm.Township" />
                  </el-form-item>
                  <el-form-item label="断面名称">
                    <el-input v-model="addForm.SectionName" />
                  </el-form-item>
                  <el-form-item label="河流名称">
                    <el-input v-model="addForm.RiverName" />
                  </el-form-item>
                  <el-form-item label="年份">
                    <el-input v-model="addForm.Year" />
                  </el-form-item>
                  <el-form-item label="季度">
                    <el-input v-model="addForm.Quarter" />
                  </el-form-item>
                  <el-form-item label="氨氮(mg/l)">
                    <el-input v-model="addForm.AmmoniaNitrogen" />
                  </el-form-item>
                  <el-form-item label="总磷(mg/l)">
                    <el-input v-model="addForm.TotalPhosphorus" />
                  </el-form-item>
                  <el-form-item label="高猛酸盐(mg/l)">
                    <el-input v-model="addForm.PermanganateIndex" />
                  </el-form-item>
                  <el-form-item label="溶解氧(mg/l)">
                    <el-input v-model="addForm.DissolvedOxygen" />
                  </el-form-item>
                  <el-form-item label="达标情况">
                    <el-input v-model="addForm.ComplianceStatus" />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button class="cancel" @click="dialogVisible2 = false"
                      >取消</el-button
                    >
                    <el-button
                      class="confirm-button"
                      type="primary"
                      @click="
                        dialogVisible2 = false;
                        add();
                      "
                    >
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
              <el-button
                :plain="true"
                class="danger"
                type="danger"
                @click="deleteSelected()"
                >删除</el-button
              >
            </div>
          </el-header>
          <!-- 右侧主体 -->
          <el-main>
            <el-table
              id="table"
              :data="
                qualityList.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              stripe
              style="width: 97%"
              height="546"
              :default-sort="{
                prop: 'Township,SectionName,RiverName,Date',
                order: 'descending',
              }"
              @selection-change="selectionLineChangeHandle"
            >
              <el-table-column type="selection" width="30" />
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
              <el-table-column label="操作" width="72">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.row), (dialogVisible = true)"
                    >编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog v-model="dialogVisible" title="更新数据" width="70%">
              <el-form
                :inline="true"
                :model="form"
                label-width="50px"
                label-position="top"
                size="small"
              >
                <el-form-item label="序号">
                  <el-input v-model="form.id" disabled />
                </el-form-item>
                <el-form-item label="镇区">
                  <el-input v-model="form.Township" />
                </el-form-item>
                <el-form-item label="断面名称">
                  <el-input v-model="form.SectionName" />
                </el-form-item>
                <el-form-item label="河流名称">
                  <el-input v-model="form.RiverName" />
                </el-form-item>
                <el-form-item label="日期">
                  <el-input v-model="form.Date" disabled />
                </el-form-item>
                <el-form-item label="氨氮(mg/l)">
                  <el-input v-model="form.AmmoniaNitrogen" />
                </el-form-item>
                <el-form-item label="总磷(mg/l)">
                  <el-input v-model="form.TotalPhosphorus" />
                </el-form-item>
                <el-form-item label="高猛酸盐(mg/l)">
                  <el-input v-model="form.PermanganateIndex" />
                </el-form-item>
                <el-form-item label="溶解氧(mg/l)">
                  <el-input v-model="form.DissolvedOxygen" />
                </el-form-item>
                <el-form-item label="达标情况">
                  <el-input v-model="form.ComplianceStatus" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button
                    class="confirm-button"
                    type="primary"
                    @click="(dialogVisible = false), update()"
                  >
                    确认
                  </el-button>
                </span>
              </template>
            </el-dialog>
            <!-- 分页 -->
            <el-config-provider :locale="locale">
              <el-pagination
                @current-change="handleCurrentChange"
                small
                :pager-count="5"
                background
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total,prev, pager, next"
                :total="qualityList.length"
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

    margin: 37px 10px 0;

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

    margin: 37px 10px 0 0;
    padding: 0;
    .el-header {
      display: flex;
      justify-content: space-between;
      .el-select {
        width: 114px;
        margin-left: 15px;
      }
      .el-select:first-child {
        margin-left: 0px;
      }
      .el-button {
        background: #409eff;
        margin-left: 15px;
      }
      .el-button:last-child {
        margin-right: 15px;
      }
      .reset {
        background: #ecf5ff;
        border-color: #a0cfff;
        color: #409eff;
      }
      .el-dialog {
        .cancel {
          background: #fff;
          color: #000;

          :hover {
            background: #ecf5ff;
            border-color: #a0cfff;
            color: #409eff;
          }
        }

        .el-button:last-child {
          margin-right: 0;
        }
      }

      .danger {
        background: #f56c6c;
        color: #fff;
      }
    }
    .el-main {
      height: 658px;
      width: 100%;
      border-radius: 35px;
      border: 1px solid #bbbbbb;

      margin: 0;

      .el-table {
        margin: 20px auto;
        .el-button {
          background: #fff;
          border-color: #cbcbcd;
          color: #505255;

          :hover {
            background: #ecf5ff;
            border-color: #a0cfff;
            color: #409eff;
          }
        }
      }

      .el-dialog {
        .confirm-button {
          background-color: #409eff;
        }
      }
      .el-pagination {
        margin: 20px 20px 0 0;
        float: right;
      }
    }
  }
}
</style>
