import express, { Request, Response } from "express";
import { AppDataSource } from "./app-data-source";
import { regionSearchValidator } from "./middleware/regionSearchValidator";
import { searchRegion } from "./service/region";

const app = express();
app.use(express.json());

//router몇개 안되서, routes 미구성
app.get("/", function (req: Request, res: Response) {
  res.send("welcome!");
});

app.get(
  "/search-region",
  regionSearchValidator,
  async function (req: Request, res: Response) {
    const data: string = req.query.data as string;
    const result = await searchRegion(data);

    res.send({
      data: result[0],
      message:
        result[1] !== ""
          ? `예외 항목은 ${result[1].slice(0, -2)}입니다`
          : "예외 항목은 없습니다",
    });
  }
);

app.get("*", function (req: Request, res: Response) {
  res.send("404");
});

// start express server
AppDataSource.initialize().then(() => console.log("☘️ DB Connection"));
app.listen(3000);
