import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from '../games/games.service';
import { CatalogService } from './catalog.service';
import * as moment from 'moment';

describe('CatalogService', () => {
  let catalogService: CatalogService;
  let gamesService: GamesService;
  const mockedGames = [
    {
      id: 0,
      title: 'A',
      price: 90.99,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(16, 'months').toDate(),
    },
    {
      id: 1,
      title: 'A',
      price: 10.0,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(5, 'months').toDate(),
    },
    {
      id: 2,
      title: '',
      price: 100,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(16, 'months').toDate(),
    },
    {
      id: 3,
      title: '',
      price: 5,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(18, 'months').toDate(),
    },
    {
      id: 4,
      title: '',
      price: 50,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(18, 'months').add(1, 'day').toDate(),
    },
    {
      id: 5,
      title: '',
      price: 42.5,
      tags: [],
      publisher: undefined,
      releaseDate: moment().subtract(22, 'months').toDate(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: GamesService,
          useValue: {
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    catalogService = module.get<CatalogService>(CatalogService);
    gamesService = module.get<GamesService>(GamesService);
  });

  it('should remove games older than 18 months', async () => {
    jest.spyOn(gamesService, 'findAll').mockResolvedValue(mockedGames);
    const deleteSpy = jest.spyOn(gamesService, 'delete');

    await catalogService.removeOldGames();

    expect(deleteSpy).toHaveBeenCalledTimes(2);
    expect(deleteSpy).toHaveBeenCalledWith(3);
    expect(deleteSpy).toHaveBeenCalledWith(5);
  });

  it('should discount games between 12 and 18 months old', async () => {
    jest.spyOn(gamesService, 'findAll').mockResolvedValue(mockedGames);
    const updateSpy = jest.spyOn(gamesService, 'update');

    await catalogService.discountOldGames();

    expect(updateSpy).toHaveBeenCalledTimes(3);
    expect(updateSpy).toHaveBeenNthCalledWith(1, 0, {
      ...mockedGames[0],
      price: 72.79,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(2, 2, {
      ...mockedGames[2],
      price: 80,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(3, 4, {
      ...mockedGames[4],
      price: 40,
    });
  });
});
