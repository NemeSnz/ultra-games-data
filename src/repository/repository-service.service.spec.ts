import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryServiceService } from './repository-service.service';

describe('RepositoryServiceService', () => {
  let service: RepositoryServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryServiceService],
    }).compile();

    service = module.get<RepositoryServiceService>(RepositoryServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
