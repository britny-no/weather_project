import { AppDataSource } from "../app-data-source";
import { RegionEntity } from "../entity/region.entity";

export const regionRepository = AppDataSource.getRepository(RegionEntity);
