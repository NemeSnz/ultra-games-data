import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Publisher } from '../publishers/publishers.entity';
import { Game } from './games.entity';
import { GamesService } from './games.service';
import { RepositoryController } from 'src/repository/repository-controller.controller';

@Controller('games')
export class GamesController extends RepositoryController<Game> {
  constructor(private readonly gamesService: GamesService) {
    super(gamesService);
  }

  @Get(':id/publisher')
  public async findPublisher(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Publisher> {
    return this.gamesService.findPublisher(id);
  }

  @Post()
  public create(@Body() game: { publisherId: string } & Game): Promise<Game> {
    return this.gamesService.create(game);
  }
}
