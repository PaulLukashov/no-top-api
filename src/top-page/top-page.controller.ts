import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/core/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import {
  ERR_TOP_PAGE_ALIAS_NOT_FOUND,
  ERR_TOP_PAGE_ID_NOT_FOUND,
} from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(ERR_TOP_PAGE_ID_NOT_FOUND);
    }
    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(ERR_TOP_PAGE_ALIAS_NOT_FOUND);
    }
    return topPage;
  }

  @Get('textSearch/:text')
  async getByText(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(ERR_TOP_PAGE_ID_NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(ERR_TOP_PAGE_ID_NOT_FOUND);
    }
    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByFirstCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByFirstCategory(dto.firstCategory);
  }
}
