import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum eTopLevelCategoryDto {
  Courses,
  Services,
  Books,
  Products,
}

export class HhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  junSalary: number;

  @IsNumber()
  midSalary: number;

  @IsNumber()
  senSalary: number;
}

export class AdvantageDataDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto extends TimeStamps {
  @IsEnum(eTopLevelCategoryDto)
  firstCategory: eTopLevelCategoryDto;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => AdvantageDataDto)
  advantages: AdvantageDataDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
