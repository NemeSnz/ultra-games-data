import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import {PublishersModule} from 'src/publishers/publishers.module';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [PublishersModule],
  exports: [GamesService],
})
export class GamesModule {}
