import { onMounted, ref } from "vue";

import { search } from "@/apis/search";

const townshipList = ref([]);
export function useTownshipList() {
  const getTownshipList = async () => {
    const res = await search();
    for (let i = 0; i < res.data.length; i++) {
      townshipList.value.push({
        Township: res.data[i].Township,
      });
    }
    const unique = (arr) => {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.Township) && res.set(arr.Township, 1)
      );
    };
    let arr1 = unique(townshipList.value);
    townshipList.value = arr1;
    // console.log(townshipList);
    // console.log(townshipList.value.length);
    // for (let i = 0; i < townshipList.value.length; i++) {
    // console.log(townshipList.value[i]);
    // }
  };
  onMounted(() => getTownshipList());
  return {
    townshipList,
  };
}

// export function getTownshipList() {
//   const townshipList = ref([]);
//   const res = search();
//   for (let i = 0; i < res.data.data.length; i++) {
//     townshipList.value.push({
//       Township: res.data.data[i].Township,
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

//   return {
//     townshipList,
//   };
// }
