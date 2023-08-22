export function isHidden(className) {
  let byClass = document.getElementsByClassName(className)[0].style;
  byClass.display = "none";
  if (className == "query") {
    let byClass1 = document.getElementsByClassName("point");
    for (let i = 0; i < byClass1.length; i++) {
      byClass1[i].style.background = "#efefef";
      byClass1[i].style.color = "#000";
    }
  }
}
export function isShow(className, id) {
  let byClass = document.getElementsByClassName(className)[0].style;
  byClass.display = "block";
  if (className == "query") {
    let byClass1 = document.getElementsByClassName("point");
    for (let i = 0; i < byClass1.length; i++) {
      byClass1[i].style.background = "#efefef";
      byClass1[i].style.color = "#000";
    }
    let byClass = document.getElementsByClassName("point")[id - 1].style;
    byClass.background = "#0B96F0";
    byClass.color = "#fff";
  }
}
