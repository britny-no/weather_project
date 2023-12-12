import { AppDataSource } from "../app-data-source";
import { SearchHistoryEntity } from "../entity/searchHistory.entity";

export const SearchHistoryRepository =
  AppDataSource.getRepository(SearchHistoryEntity);
