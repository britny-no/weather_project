import express, { Request, Response } from "express";
import { myDataSource } from "./app-data-source";
// create and setup express app
const app = express();
app.use(express.json());

// register routes

// depth1,2,3으로 표현하고
// linked array로 부모자식 관계?
const depth1 = ["서울", "경기", "경상", "경상남도", "경상북도"];
const depth2 = [
  "관악구",
  "강남구",
  "용산구",
  "수원시",
  "장안구",
  "권선구",
  "영통구",
  "성남시",
  "분당구",
  "수정구",
  "중원구",
  "진주시",
  "창원시",
  "마산합포구",
  "마산회원구",
  "함양군",
  "포항시",
  "경주시",
  "구미시",
];
const depth3 = [
  "낙성대동",
  "신림동",
  "보라매동",
  "청담동",
  "논현동",
  "압구정동",
  "문배동",
  "원효로1동",
  "원효로2동",
  "영화동",
  "파장동",
  "연무동",
  "평동",
  "구온동",
  "곡선동",
  "영통1동",
  "영통2동",
  "메탄2동",
  "서현1동",
  "이매1동",
  "야탄1동",
  "고등동",
  "단대동",
  "신촌동",
  "성남동",
  "중앙동",
  "도촌동",
  "대평면",
  "금석면",
  "명석면",
  "자산동",
  "월영동",
  "오동동",
  "양덕동",
  "석전동",
  "함양읍",
  "마천면",
];

const depth1_ob = {
  서울: ["관악구", "강남구", "용산구"],
  경기: ["수원시", "성남시"],
  경상: ["경상남도", "경상북도"],
  경상남도: ["진주시", "창원시", "함양군"],
  경상북도: ["포항시", "경주시", "구미시"],
};

const depth2_ob = {
  관악구: ["낙성대동", "신림동", "보라매동"],
  강남구: ["청담동", "논현동", "압구정동"],
  // ''
};

app.get("/users", function (req: Request, res: Response) {
  res.send("123");
});

app.get("/position", function (req: Request, res: Response) {
  res.send("123");
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
