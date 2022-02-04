import { Controller } from '@nestjs/common';
import { RepositoryController } from '../repository/repository.controller';
import { Publisher } from './publishers.entity';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController extends RepositoryController<Publisher> {
  constructor(publishersService: PublishersService) {
    super(publishersService);
  }
}
