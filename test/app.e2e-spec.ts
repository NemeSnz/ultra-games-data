import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
import { Game } from '../src/games/games.entity';
import { Publisher } from '../src/publishers/publishers.entity';
import * as moment from 'moment';

const mockedPublishers = [
  {
    id: 1,
    name: 'Ultra Publishing',
    siret: 421,
    phone: '555-555-5555',
  },
  {
    id: 2,
    name: 'Not Nintendo',
    siret: 571,
    phone: '888-888-8888',
  },
];

const mockedGames = [
  {
    id: 1,
    releaseDate: new Date(),
    title: 'Mocking Game',
    tags: ['action', 'adventure'],
    price: 20.5,
    publisher: mockedPublishers[0],
  },
  {
    id: 2,
    releaseDate: moment().subtract(20, 'months').toDate(),
    title: 'Happy Birds',
    tags: ['strategy', 'adventure', 'casual'],
    price: 20.5,
    publisher: mockedPublishers[1],
  },
  {
    id: 3,
    releaseDate: moment().subtract(15, 'months').toDate(),
    title: 'Game of love',
    tags: [],
    price: 20.5,
    publisher: mockedPublishers[0],
  },
];

const mockedGamesNoPublisher = mockedGames.map(
  ({ publisher: _, releaseDate, ...game }) => ({
    ...game,
    releaseDate: releaseDate.toISOString(),
  }),
);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.useLogger(new TestLogger()) // more on this line is below
    await app.init();

    const connection = app.get(Connection);
    await connection.getRepository(Publisher).save(mockedPublishers);
    await connection.getRepository(Game).save(mockedGames);
  });

  it('/games (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/games')
      .expect(200);

    expect(response.body).toEqual(mockedGamesNoPublisher);
  });

  it('/games/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/games/1')
      .expect(200);

    expect(response.body).toEqual(mockedGamesNoPublisher[0]);
  });

  it('/games/:id/publisher (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/games/1/publisher')
      .expect(200);

    expect(response.body).toEqual(mockedPublishers[0]);
  });

  it('/games (POST)', async () => {
    const newGame = {
      releaseDate: Date.now(),
      title: 'Game of life',
      tags: ['action', 'adventure'],
      price: 100.6,
      publisherId: 2,
    };

    await request(app.getHttpServer()).post('/games').send(newGame).expect(201);

    const response = await request(app.getHttpServer())
      .get('/games')
      .expect(200);

    expect(response.body).toEqual([
      ...mockedGamesNoPublisher,
      {
        ...newGame,
        id: 4,
        publisherId: undefined,
        releaseDate: newGame.releaseDate,
      },
    ]);
  });

  it('/games (PUT)', async () => {
    await request(app.getHttpServer())
      .put('/games/2')
      .send({ title: 'Game of death' })
      .expect(200);

    const {
      body: { title },
    } = await request(app.getHttpServer()).get('/games/2').expect(200);

    expect(title).toEqual('Game of death');
  });

  it('/games (DEL)', async () => {
    await request(app.getHttpServer()).del('/games/4').expect(200);

    await request(app.getHttpServer()).get('/games/4').expect(404);
  });

  it('/catalog/refresh (PUT)', async () => {
    await request(app.getHttpServer()).put('/catalog/refresh').expect(200);

    // Remove games having a release date older than 18 months
    await request(app.getHttpServer()).get('/games/2').expect(404);

    // Apply a 20% discount to games having a release date between 12 and 18 months
    const { body: discountedGame } = await request(app.getHttpServer())
      .get('/games/3')
      .expect(200);
    expect(discountedGame).toEqual({
      ...mockedGamesNoPublisher[2],
      price: 16.4,
    });
  });
});
