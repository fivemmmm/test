export function isHidden(className) {
  let byClass = document.getElementsByClassName(className)[0].style;
  byClass.display = "none";
}
export function isShow(className) {
  let byClass = document.getElementsByClassName(className)[0].style;
  byClass.display = "block";
}
