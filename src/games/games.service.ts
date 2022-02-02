import { Injectable, NotFoundException } from '@nestjs/common';
import { PublisherModel } from 'src/publishers/publishers.interface';
import { PublishersService } from 'src/publishers/publishers.service';
import { GameModel } from './games.interface';

@Injectable()
export class GamesService {
  private games: Array<GameModel> = [];

  constructor(private readonly publisherService: PublishersService) {}

  public findAll(): Array<GameModel> {
    return this.games;
  }

  public findOne(id: number): GameModel {
    const game = this.games.find((aGame) => aGame.id === id);

    if (!game) {
      throw new NotFoundException();
    }

    return game;
  }

  public findPublisher(gameId: number): PublisherModel {
    const { publisherId } = this.findOne(gameId);
    return this.publisherService.findOne(publisherId);
  }

  public create(game: GameModel): GameModel {
    // if the title is already in use by another game
    // const titleExists: boolean = this.games.some(
    //   (item) => item.title === game.title,
    // );
    // if (titleExists) {
    //   throw new UnprocessableEntityException('Game title already exists.');
    // }

    // find the next id for a new game
    const id = Math.max(...this.games.map((game) => game.id), 0) + 1;

    const newGame: GameModel = {
      ...game,
      id,
    };

    this.games.push(newGame);

    return newGame;
  }

  public delete(id: number): void {
    const index = this.games.findIndex((game) => game.id === id);

    if (index === -1) {
      throw new NotFoundException('Game not found.');
    }

    this.games.splice(index, 1);
  }

  public update(id: number, game: GameModel): GameModel {
    // this.logger.log(`Updating post with id: ${id}`);

    const index = this.games.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Game not found.');
    }

    const newGame: GameModel = {
      ...game,
      id,
    };

    this.games[index] = newGame;

    return newGame;
  }
}
