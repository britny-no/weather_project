import { regionRepository } from "./../repository/region.repository";
import { SearchHistoryRepository } from "../repository/searchHistory.repository";
import { topDownOb, bottomUpOb } from "../constant/ob";
import { findParent, generateTreeBar } from "../js/index";
import { Like } from "typeorm";

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
  if (whereArray.length > 0) {
    whereArray.slice(0, 2).forEach(async (v) => {
      await SearchHistoryRepository.insert(v);
    });
    const dbData = await regionRepository.find({
      where: whereArray,
    });
    dbData.forEach((v) => {
      const { name, fall } = v;
      if (v.top === 1) {
        topArr.push([name, fall]);
      } else {
        restArr.push([name, fall]);
      }
    });
  }

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

export const getSimilarRegion = async (data: string) => {
  return await regionRepository.find({
    where: { name: Like(`%${data}%`) },
  });
};

export const recommendRegion = async () => {
  return await SearchHistoryRepository.find({
    take: 3,
    order: { date: "DESC" },
  });
};

export const getChildRegion = async (data: string) => {
  const childArr = topDownOb[data];
  if (childArr.length > 0) {
    const whereArray: { name: string }[] = [];
    childArr.forEach((name) => {
      whereArray.push({ name });
    });
    return await regionRepository.find({
      where: whereArray,
    });
  } else {
    return [];
  }
};
