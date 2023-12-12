"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./app-data-source");
const regionSearchValidator_1 = require("./middleware/regionSearchValidator");
const region_1 = require("./service/region");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//router몇개 안되서, routes 미구성
app.get("/", function (req, res) {
    res.send("welcome!");
});
app.get("/search-region", regionSearchValidator_1.regionSearchValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.query.data;
        const result = yield (0, region_1.searchRegion)(data);
        res.send({
            data: result[0],
            message: result[1] !== ""
                ? `예외 항목은 ${result[1].slice(0, -2)}입니다`
                : "예외 항목은 없습니다",
        });
    });
});
app.get("/similar-region", regionSearchValidator_1.regionSearchValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.query.data;
        const result = yield (0, region_1.getSimilarRegion)(data);
        res.send({
            data: result,
            message: "성공",
        });
    });
});
app.get("/recommend-region", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, region_1.recommendRegion)();
        res.send({
            data: result,
            message: "성공",
        });
    });
});
app.get("/get-child-region", regionSearchValidator_1.regionSearchValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.query.data;
        const result = yield (0, region_1.getChildRegion)(data);
        res.send({
            data: result,
            message: result.length > 0 ? "성공" : "마지막입니다",
        });
    });
});
app.get("*", function (req, res) {
    res.send("404");
});
// start express server
app_data_source_1.AppDataSource.initialize().then(() => console.log("☘️ DB Connection"));
app.listen(process.env.PORT);
