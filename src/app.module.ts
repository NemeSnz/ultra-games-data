import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [GamesModule, CatalogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
