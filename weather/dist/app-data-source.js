"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_DB, NODE_ENV } = process.env;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PW,
    database: DB_DB,
    entities: [
        NODE_ENV === "dev" ? "src/entity/*.entity.ts" : "dist/entity/*.entity.js",
    ],
    // logging: true,
    // synchronize: true,
});
