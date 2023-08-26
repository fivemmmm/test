import axios from "axios";

const arr1 = [];
export async function getTownshipList() {
  // const sectionList = ref([]);
  const queryParams = {};

  // 发送GET请求并保存结果
  const response = await axios.get("http://localhost:3000/cat", {
    params: queryParams,
  });
  // 处理响应结果
  const res = response.data; // 将响应数据保存在变量中
  //   这里您可以对结果进行其他处理或存储操作;
  for (let i = 0; i < res.data.length; i++) {
    arr1.push({
      Township: res.data[i].Township,
    });
  }
  const unique = (arr) => {
    const res = new Map();
    return arr.filter(
      (arr) => !res.has(arr.Township) && res.set(arr.Township, 1)
    );
  };
  let townshipList = unique(arr1);
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
