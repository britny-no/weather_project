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

@Entity({ name: "test" })
export class WeatherEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  no!: string;

  @Column({ type: "varchar", length: 1111 })
  name: string = "none";
}
