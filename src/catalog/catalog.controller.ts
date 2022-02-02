import { Controller, Put } from '@nestjs/common';
import {GameModel} from 'src/games/games.interface';
import {CatalogService} from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Put('/refresh')
  public update(): {
    removedGames: GameModel[],
    discountedGames: GameModel[],
  } {
    const removedGames = this.catalogService.removeOldGames();
    const discountedGames = this.catalogService.discountOldGames();

    return { removedGames, discountedGames };
  }
}
