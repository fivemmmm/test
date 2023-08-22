import request from "@/utils/index";

export function search(
  id,
  SectionName,
  RiverName,
  Year,
  Quarter,
  Township,
  ComplianceStatus
) {
  return request({
    url: "",
    params: {
      id,
      SectionName,
      RiverName,
      Year,
      Quarter,
      Township,
      ComplianceStatus,
    },
  });
}
