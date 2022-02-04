import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PublishersModule } from '../publishers/publishers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games.entity';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([Game]), PublishersModule],
  exports: [GamesService],
})
export class GamesModule {}
