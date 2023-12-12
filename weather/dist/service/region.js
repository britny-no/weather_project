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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildRegion = exports.recommendRegion = exports.getSimilarRegion = exports.searchRegion = void 0;
const region_repository_1 = require("./../repository/region.repository");
const searchHistory_repository_1 = require("../repository/searchHistory.repository");
const ob_1 = require("../constant/ob");
const index_1 = require("../js/index");
const typeorm_1 = require("typeorm");
const searchRegion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const textArr = data.split(" ");
    const restRegionSet = new Set();
    let result = [];
    let exceptResult = "";
    textArr
        .filter((v) => v !== "")
        .forEach((v) => {
        if (ob_1.bottomUpOb[v] !== undefined) {
            const tatalRegionArr = (0, index_1.findParent)(v, [v]);
            tatalRegionArr.forEach((v) => {
                restRegionSet.add(v);
            });
        }
        else {
            exceptResult += `${v}, `;
        }
    });
    const whereArray = [];
    for (const name of restRegionSet) {
        whereArray.push({ name });
    }
    const topArr = [];
    const restArr = [];
    if (whereArray.length > 0) {
        whereArray.slice(0, 2).forEach((v) => __awaiter(void 0, void 0, void 0, function* () {
            yield searchHistory_repository_1.SearchHistoryRepository.insert(v);
        }));
        const dbData = yield region_repository_1.regionRepository.find({
            where: whereArray,
        });
        dbData.forEach((v) => {
            const { name, fall } = v;
            if (v.top === 1) {
                topArr.push([name, fall]);
            }
            else {
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
            (0, index_1.generateTreeBar)(regionName, restArr),
        ]);
    }
    return [result, exceptResult];
});
exports.searchRegion = searchRegion;
const getSimilarRegion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield region_repository_1.regionRepository.find({
        where: { name: (0, typeorm_1.Like)(`%${data}%`) },
    });
});
exports.getSimilarRegion = getSimilarRegion;
const recommendRegion = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield searchHistory_repository_1.SearchHistoryRepository.find({
        take: 3,
        order: { date: "DESC" },
    });
});
exports.recommendRegion = recommendRegion;
const getChildRegion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const childArr = ob_1.topDownOb[data];
    if (childArr.length > 0) {
        const whereArray = [];
        childArr.forEach((name) => {
            whereArray.push({ name });
        });
        return yield region_repository_1.regionRepository.find({
            where: whereArray,
        });
    }
    else {
        return [];
    }
});
exports.getChildRegion = getChildRegion;
