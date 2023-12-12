"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryRepository = void 0;
const app_data_source_1 = require("../app-data-source");
const searchHistory_entity_1 = require("../entity/searchHistory.entity");
exports.SearchHistoryRepository = app_data_source_1.AppDataSource.getRepository(searchHistory_entity_1.SearchHistoryEntity);
