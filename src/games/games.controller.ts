import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PublisherModel } from 'src/publishers/publishers.interface';
import { GameModel } from './games.interface';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  public findAll(): Array<GameModel> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): GameModel {
    return this.gamesService.findOne(id);
  }

  @Get(':id/publisher')
  public findPublisher(@Param('id', ParseIntPipe) id: number): PublisherModel {
    return this.gamesService.findPublisher(id);
  }

  @Post()
  public create(@Body() game: GameModel): GameModel {
    return this.gamesService.create(game);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.gamesService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() game: GameModel,
  ): GameModel {
    return this.gamesService.update(id, game);
  }
}
