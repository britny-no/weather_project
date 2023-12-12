import { regionRepository } from "./../repository/region.repository";
import { topDownOb, bottomUpOb } from "../constant/ob";
import { findParent, generateTreeBar } from "../js/index";

export const searchRegion = async (data: string) => {
  const textArr = data.split(" ");
  const restRegionSet: Set<string> = new Set();
  let result: any = [];
  let exceptResult = "";

  textArr
    .filter((v) => v !== "")
    .forEach((v: string) => {
      if (bottomUpOb[v] !== undefined) {
        const tatalRegionArr = findParent(v, [v]);
        tatalRegionArr.forEach((v) => {
          restRegionSet.add(v);
        });
      } else {
        exceptResult += `${v}, `;
      }
    });

  const whereArray: Record<string, string>[] = [];
  for (const name of restRegionSet) {
    whereArray.push({ name });
  }
  const topArr: [string, number][] = [];
  const restArr: [string, number][] = [];
  const dbData = await regionRepository.find({
    where: whereArray,
  });
  dbData.forEach((v) => {
    if (v.top === 1) {
      topArr.push([v.name, v.fall]);
    } else {
      restArr.push([v.name, v.fall]);
    }
  });

  // front에서 지역 위계 구조대로 출력해도 되지만, be작업만 하므로 진행
  for (let i = 0, len = topArr.length; i < len; i++) {
    const regionName = topArr[i][0];
    const regionValue = topArr[i][1];
    result.push([
      regionName,
      regionValue,
      generateTreeBar(regionName, restArr),
    ]);
  }

  return [result, exceptResult];
};
