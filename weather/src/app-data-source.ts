import { DataSource } from "typeorm";

require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_DB } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PW,
  database: DB_DB,
  entities: ["src/entity/*.entity.ts"],
  // logging: true,
  // synchronize: true,
});
