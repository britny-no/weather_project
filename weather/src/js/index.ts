import { topDownOb, bottomUpOb } from "../constant/ob";

export const findParent = (tar: string, result: string[]): string[] => {
  if (bottomUpOb[tar] === null) {
    return result;
  } else {
    const nextTar = bottomUpOb[tar] as string;
    return findParent(nextTar, [nextTar, ...result]);
  }
};

const checkRegionIsIt = (tarName: string, childArray: string[]) => {
  for (let i = 0, len = childArray.length; i < len; i++) {
    if (childArray[i] === tarName) {
      return true;
    }
  }

  return false;
};

export const generateTreeBar = (startName: string, restArr: any) => {
  if (topDownOb[startName] && topDownOb[startName].length > 0) {
    // restArr기준으로 필터해야, 바로 값 축출 가능
    return restArr
      .filter((v: [string, number]) =>
        checkRegionIsIt(v[0], topDownOb[startName])
      )
      .map((v: [string, number]) => {
        return [v[0], v[1], generateTreeBar(v[0], restArr)];
      });
  } else {
    return [];
  }
};
