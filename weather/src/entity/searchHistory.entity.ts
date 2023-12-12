import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "SEARCH_HISTORY" })
export class SearchHistoryEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  search_history_index: string;

  @Column({ type: "varchar", length: 100 })
  keyword: string;

  @Column({ type: "int" })
  user_index: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
