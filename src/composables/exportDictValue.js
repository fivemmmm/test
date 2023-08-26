import { computed } from "vue";

export async function exportDictValue(dict) {
  // 创建一个计算属性，将字典列表的 value 取出形成列表
  const valueList = computed(() => {
    return dict.map((item) => item.Township);
  });
  const dictList = valueList.value;
  return {
    dictList,
  };
}
