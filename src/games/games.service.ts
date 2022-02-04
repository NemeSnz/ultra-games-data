import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from '../publishers/publishers.entity';
import { RepositoryService } from '../repository/repository-service.service';
import { DeepPartial, Repository } from 'typeorm';
import { Game } from './games.entity';

@Injectable()
export class GamesService extends RepositoryService<Game> {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    @InjectRepository(Publisher)
    private readonly publishersRepository: Repository<Publisher>,
  ) {
    super(gamesRepository);
  }

  public async findPublisher(id: number): Promise<Publisher> {
    const { publisher } = await this.gamesRepository.findOne(id, {
      relations: ['publisher'],
    });
    return publisher;
  }

  public async create({
    publisherId,
    ...game
  }: DeepPartial<Game> & { publisherId: string }): Promise<Game> {
    const publisher = await this.publishersRepository.findOne(publisherId);
    if (!publisher) {
      throw new NotFoundException(
        `Publisher not found with id = ${publisherId}`,
      );
    }
    return this.gamesRepository.save(
      this.gamesRepository.create({ ...game, publisher }),
    );
  }
}
