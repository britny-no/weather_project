"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionRepository = void 0;
const app_data_source_1 = require("../app-data-source");
const region_entity_1 = require("../entity/region.entity");
exports.regionRepository = app_data_source_1.AppDataSource.getRepository(region_entity_1.RegionEntity);
