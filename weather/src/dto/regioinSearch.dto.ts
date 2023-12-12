import {
  IsNotEmpty,
  IsString,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from "class-validator";

export class RegionSearchDto {
  @IsNotEmpty()
  @IsString()
  data: string;
}
