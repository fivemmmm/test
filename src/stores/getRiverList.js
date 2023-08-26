import axios from "axios";

export async function getRiverList(township, sectionName) {
  const arr1 = [];
  const queryParams = {
    SectionName: sectionName,
    Township: township,
  };
  // 发送GET请求并保存结果
  const response = await axios.get("http://localhost:3000/cat", {
    params: queryParams,
  });
  // 处理响应结果
  const res = response.data; // 将响应数据保存在变量中
  //   这里您可以对结果进行其他处理或存储操作;
  for (let i = 0; i < res.data.length; i++) {
    arr1.push({
      RiverName: res.data[i].RiverName,
    });
  }
  const unique = (arr) => {
    const res = new Map();
    return arr.filter(
      (arr) => !res.has(arr.RiverName) && res.set(arr.RiverName, 1)
    );
  };
  let riverList = unique(arr1);
  return {
    riverList,
  };
}
