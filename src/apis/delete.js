// import { ref } from "vue";
import axios from "axios";

export async function deleteQualityList(deleteList) {
  for (let id = 0; id < deleteList.length; id++) {
    await axios
      //   .delete(`http://localhost:3000/cat/${deleteList[id]}`)
      .delete(`http://localhost:3000/cat/${deleteList[id]}`)
      .then((res) => {
        console.log(res, "res");
      });
  }
}
