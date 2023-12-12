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

@Entity({ name: "REGION" })
export class RegionEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  region_index: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "int" })
  top: number;

  @Column({ type: "int" })
  fall: number;
}
