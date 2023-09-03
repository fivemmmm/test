// import { ref } from "vue";
import axios from "axios";

export async function getQualityList(
  township,
  sectionName,
  riverName,
  year,
  quarter
) {
  // const qualityList = ref([]);
  let qualityList = null;
  const queryParams = {
    Township: township,
    SectionName: sectionName,
    RiverName: riverName,
    Year: year,
    Quarter: quarter,
  };
  // 发送GET请求并保存结果
  // const response = await axios.get("http://localhost:3000/cat", {
  //   params: queryParams,
  // });

  await axios
    .get("http://localhost:3000/cat", {
      params: queryParams,
    })
    .then((res) => {
      console.log(queryParams);
      qualityList = res.data.data;
      qualityList = res.data.data.map((item) => {
        // Add a new key-value pair to each item
        return {
          ...item, // Copy existing properties
          Date: `${item.Year}/0${item.Quarter}`, // Add new key-value pair
          AmmoniaNitrogenStandard: 1,
          TotalPhosphorusStandard: 0.2,
          PermanganateIndexStandard: 6,
          DissolvedOxygenStandard: 5,
        };
      });
      qualityList.sort((a, b) => {
        return a.id - b.id;
      });
    });

  // 处理响应结果
  // const res = response.data; // 将响应数据保存在变量中
  //   这里您可以对结果进行其他处理或存储操作;
  return {
    qualityList,
  };
}
