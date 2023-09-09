import axios from "axios";
import { getQualityList } from "@/stores/getQualityList";

export async function addQualityList(queryParams) {
  await axios.post("http://localhost:3000/cat", queryParams).then((res) => {
    console.log(res, "res");
  });
}
