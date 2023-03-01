import { IsEnum } from 'class-validator';
import { eTopLevelCategoryDto } from './create-top-page.dto';

export class FindTopPageDto {
  @IsEnum(eTopLevelCategoryDto)
  firstCategory: eTopLevelCategoryDto;
}
