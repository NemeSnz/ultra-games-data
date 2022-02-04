import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryControllerController } from './repository-controller.controller';

describe('RepositoryControllerController', () => {
  let controller: RepositoryControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoryControllerController],
    }).compile();

    controller = module.get<RepositoryControllerController>(
      RepositoryControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
