"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTreeBar = exports.findParent = void 0;
const ob_1 = require("../constant/ob");
const findParent = (tar, result) => {
    if (ob_1.bottomUpOb[tar] === null) {
        return result;
    }
    else {
        const nextTar = ob_1.bottomUpOb[tar];
        return (0, exports.findParent)(nextTar, [nextTar, ...result]);
    }
};
exports.findParent = findParent;
const checkRegionIsIt = (tarName, childArray) => {
    for (let i = 0, len = childArray.length; i < len; i++) {
        if (childArray[i] === tarName) {
            return true;
        }
    }
    return false;
};
const generateTreeBar = (startName, restArr) => {
    if (ob_1.topDownOb[startName] && ob_1.topDownOb[startName].length > 0) {
        // restArr기준으로 필터해야, 바로 값 축출 가능
        return restArr
            .filter((v) => checkRegionIsIt(v[0], ob_1.topDownOb[startName]))
            .map((v) => {
            return [v[0], v[1], (0, exports.generateTreeBar)(v[0], restArr)];
        });
    }
    else {
        return [];
    }
};
exports.generateTreeBar = generateTreeBar;
