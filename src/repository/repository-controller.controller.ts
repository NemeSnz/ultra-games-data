import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { RepositoryService } from './repository-service.service';
import { BaseEntity } from './repository.entity';

export class RepositoryController<T extends BaseEntity> {
  constructor(private readonly repositoryService: RepositoryService<T>) {}

  @Get()
  public findAll(): Promise<T[]> {
    return this.repositoryService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.repositoryService.findOne(id);
  }

  @Post()
  public create(@Body() entity: DeepPartial<T>): Promise<T> {
    return this.repositoryService.create(entity);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.repositoryService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: DeepPartial<T>,
  ): Promise<UpdateResult> {
    return this.repositoryService.update(id, entity);
  }
}
