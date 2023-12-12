import { topDownOb, bottomUpOb } from "../constant/ob";
import { findParent, generateTreeBar } from "../js/index";
import { regionSearchValidator } from "../middleware/regionSearchValidator";

export const searchRegion = (data: string) => {
  const textArr = data.split(" ");
  const topRegionSet: Set<string> = new Set();
  const restRegionSet: Set<string> = new Set();
  let result: any = [];
  let exceptResult = "";

  textArr
    .filter((v) => v !== "")
    .forEach((v: string) => {
      if (bottomUpOb[v] !== undefined) {
        const tatalRegionArr = findParent(v, [v]);
        topRegionSet.add(tatalRegionArr[0]);
        tatalRegionArr.slice(1).forEach((v) => {
          restRegionSet.add(v);
        });
      } else {
        exceptResult += `${v}, `;
      }
    });

  // set에 각 값별 가져왔다고 생각
  const topArr: any = [];
  const arr: any = [];
  let i = 0;
  for (const string of topRegionSet) {
    i += 1;
    topArr.push([string, i]);
  }
  for (const string of restRegionSet) {
    i += 1;
    arr.push([string, i]);
  }

  // front에서 지역 위계 구조대로 출력해도 되지만, be작업만 하므로 진행
  for (let i = 0, len = topArr.length; i < len; i++) {
    const regionName = topArr[i][0];
    const regionValue = topArr[i][1];
    result.push([regionName, regionValue, generateTreeBar(regionName, arr)]);
  }

  return [result, exceptResult];
};
