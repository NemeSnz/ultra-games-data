import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Game } from '../games/games.entity';
import { GamesService } from '../games/games.service';

@Injectable()
export class CatalogService {
  constructor(private readonly gamesService: GamesService) {}

  public async removeOldGames(): Promise<Game[]> {
    const games = await this.gamesService.findAll();

    const gamesToRemove = games.filter(({ releaseDate }) =>
      moment(releaseDate).isBefore(moment().subtract(18, 'month')),
    );

    gamesToRemove.forEach(({ id }) => this.gamesService.delete(id));

    return gamesToRemove;
  }

  public async discountOldGames(): Promise<Game[]> {
    const games = await this.gamesService.findAll();

    const gamesToDiscount = games.filter(({ releaseDate }) =>
      moment(releaseDate).isBetween(
        moment().subtract(18, 'month'),
        moment().subtract(12, 'month'),
      ),
    );

    const discountedGames = gamesToDiscount.map((game) => ({
      ...game,
      price: Number((game.price * 0.8).toFixed(2)),
    }));

    discountedGames.forEach((game) => this.gamesService.update(game.id, game));

    return discountedGames;
  }
}
