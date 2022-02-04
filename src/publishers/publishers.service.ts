import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '../repository/repository-service.service';
import { Repository } from 'typeorm';
import { Publisher } from './publishers.entity';

@Injectable()
export class PublishersService extends RepositoryService<Publisher> {
  constructor(
    @InjectRepository(Publisher)
    publishersRepository: Repository<Publisher>,
  ) {
    super(publishersRepository);
  }
}
