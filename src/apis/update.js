// import { ref } from "vue";
import axios from "axios";

export async function updateQualityList(queryParams) {
  // const queryParams = {
  //   id: id,
  //   Township: Township,
  //   SectionName: SectionName,
  //   RiverName: RiverName,
  //   Year: Year,
  //   Quarter: Quarter,
  //   AmmoniaNitrogen: AmmoniaNitrogen,
  //   TotalPhosphorus: TotalPhosphorus,
  //   PermanganateIndex: PermanganateIndex,
  //   DissolvedOxygen: DissolvedOxygen,
  //   ComplianceStatus: ComplianceStatus,
  // };
  await axios
    .put(`http://localhost:3000/cat/${queryParams.id}`, queryParams)
    .then((res) => {
      console.log(res, "res");
    });
}
