import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { CatalogModule } from './catalog/catalog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/games.entity';
import { Publisher } from './publishers/publishers.entity';
import { PublishersModule } from './publishers/publishers.module';

const DB_PATH = process.env.DB_PATH || 'db.sqlite';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'test' ? ':memory:' : DB_PATH,
      entities: [Game, Publisher],
      synchronize: true,
    }),
    GamesModule,
    PublishersModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
