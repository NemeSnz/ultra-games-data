import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { GameModel } from 'src/games/games.interface';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class CatalogService {
  constructor(private readonly gamesService: GamesService) {}

  removeOldGames(): GameModel[] {
    const games = this.gamesService.findAll();

    const gamesToRemove = games.filter(({ releaseDate }) =>
      moment(releaseDate).isBefore(moment().subtract(18, 'month')),
    );

    gamesToRemove.forEach(({ id }) => this.gamesService.delete(id));

    return gamesToRemove;
  }

  discountOldGames(): GameModel[] {
    const games = this.gamesService.findAll();

    const gamesToDiscount = games.filter(({ releaseDate }) =>
      moment(releaseDate).isBetween(
        moment().subtract(8, 'month'),
        moment().subtract(12, 'month'),
      ),
    );

    const discountedGames = gamesToDiscount.map((game) => ({
      ...game,
      price: game.price * 0.8,
    }));

    discountedGames.forEach((game) => this.gamesService.update(game.id, game));

    return discountedGames;
  }
}
