import express, { Request, Response } from "express";
import { myDataSource } from "./app-data-source";
import { topDownOb, bottomUpOb } from "./constant/ob";
// create and setup express app
const app = express();
app.use(express.json());

// register routes

// depth1,2,3으로 표현하고
// linked array로 부모자식 관계?

// const depth1 = Object.keys(depthOneOb);
// const depth2 = Object.keys(depthTwoOb);
// const depth3 = Object.keys(depthThreeOb);

app.get("/users", function (req: Request, res: Response) {
  res.send("123");
});

// const grouping = (arr) => {};
const checkPosIsIt = (tarName: string, childArray: string[]) => {
  for (let i = 0, len = childArray.length; i < len; i++) {
    if (childArray[i] === tarName) {
      return true;
    }
  }

  return false;
};

const findParent = (tar: string, result: string[]): string[] => {
  if (bottomUpOb[tar] === null) {
    return result;
  } else {
    const nextTar = bottomUpOb[tar] as string;
    return findParent(nextTar, [nextTar, ...result]);
  }
};

const setResult = (startName: string, restArr: any) => {
  if (topDownOb[startName] && topDownOb[startName].length > 0) {
    // restArr기준으로 필터해야, 바로 값 축출 가능
    return restArr
      .filter((v: [string, number]) => checkPosIsIt(v[0], topDownOb[startName]))
      .map((v: [string, number]) => {
        return [v[0], v[1], setResult(v[0], restArr)];
      });
  } else {
    return [];
  }
};

app.get("/position", function (req: Request, res: Response) {
  const data: string = req.query.data as string;
  if (data) {
    const textArr = data.split(" ");
    const topPosSet: Set<string> = new Set();
    const restPosSet: Set<string> = new Set();
    let result: any = [];
    let exceptResult = "";

    textArr.forEach((v: string) => {
      if (bottomUpOb[v] !== undefined) {
        const tatalPosArr = findParent(v, [v]);
        topPosSet.add(tatalPosArr[0]);
        tatalPosArr.slice(1).forEach((v) => {
          restPosSet.add(v);
        });
      } else {
        exceptResult += `${v}`;
      }
    });

    // set에 각 값별 가져왔다고 생각
    const topArr: any = [];
    const arr: any = [];
    let i = 0;
    for (const string of topPosSet) {
      i += 1;
      topArr.push([string, i]);
    }
    for (const string of restPosSet) {
      i += 1;
      arr.push([string, i]);
    }

    // front에서 지역 위계 구조대로 출력해도 되지만, be작업만 하므로 진행
    for (let i = 0, len = topArr.length; i < len; i++) {
      const posName = topArr[i][0];
      const posValue = topArr[i][1];
      result.push([posName, posValue, setResult(posName, arr)]);
    }

    res.send(result);
  } else {
    res.status(400).send("error");
  }
});

app.get("/test", function (req: Request, res: Response) {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
  res.send("123");
});
// start express server
app.listen(3000);
