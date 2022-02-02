import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import {GamesModule} from 'src/games/games.module';

@Module({
  providers: [CatalogService],
  controllers: [CatalogController],
  imports: [GamesModule],
})
export class CatalogModule {}
