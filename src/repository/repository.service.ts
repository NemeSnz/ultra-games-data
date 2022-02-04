import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BaseEntity } from './repository.entity';

@Injectable()
export class RepositoryService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  public findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Entity not found with id = ${id}`);
    }
    return entity;
  }

  public async create(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async update(
    id: number,
    entity: DeepPartial<T>,
  ): Promise<UpdateResult> {
    const exists = (await this.repository.findOne(id)) !== undefined;
    if (!exists) {
      throw new NotFoundException(`Entity not found with id = ${id}`);
    }
    return this.repository.update(id, entity);
  }
}
