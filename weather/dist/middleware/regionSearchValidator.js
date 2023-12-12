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
exports.regionSearchValidator = void 0;
const class_validator_1 = require("class-validator");
const regioinSearch_dto_1 = require("../dto/regioinSearch.dto");
const regionSearchValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query) {
            return res.status(400).send({ message: "Missing request data!" });
        }
        const product = new regioinSearch_dto_1.RegionSearchDto();
        Object.keys(req.query).forEach((v) => {
            product[v] = req.query[v];
        });
        yield (0, class_validator_1.validateOrReject)(product);
        next();
    }
    catch (e) {
        const message = Object.values(e[0].constraints)[0];
        res.status(400).send({ data: [], message });
    }
});
exports.regionSearchValidator = regionSearchValidator;
