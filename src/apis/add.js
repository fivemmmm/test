import axios from "axios";
import { getQualityList } from "@/stores/getQualityList";

export async function addQualityList(queryParams) {
  let qualityListLastId = await getQualityList().then((result) => {
    return result.qualityList[result.qualityList.length - 1].id;
  });
  console.log("qualityListLastId", qualityListLastId);
  await axios
    .put(`http://localhost:3000/cat/${queryParams.id}`, queryParams)
    .then((res) => {
      console.log(res, "res");
    });
}
