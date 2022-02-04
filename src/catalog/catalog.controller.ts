import { Controller, Put } from '@nestjs/common';
import { Game } from 'src/games/games.entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Put('/refresh')
  public async update(): Promise<{
    removedGames: Game[];
    discountedGames: Game[];
  }> {
    const removedGames = await this.catalogService.removeOldGames();
    const discountedGames = await this.catalogService.discountOldGames();

    return { removedGames, discountedGames };
  }
}
