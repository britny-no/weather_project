import { DataSource } from "typeorm";

// import {WeatherEntity} from 'src/entity'
export const myDataSource = new DataSource({
  type: "mysql",
  host: "appsDB",
  port: 3306,
  username: "root",
  password: "helloworld",
  database: "test",
  entities: ["src/entity/*.entity.ts"],
  logging: true,
  // synchronize: true,
});
