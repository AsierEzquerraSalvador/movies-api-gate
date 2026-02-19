import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get movies', async () => {
    jest.spyOn(service, 'listMovies').mockResolvedValue([]);
    const result = await controller.getMovies();
    expect(result).toEqual([]);
  });

  it('should create a movie', async () => {
    const mockMovie = { id: 1, title: 'Test' } as Movie;
    jest.spyOn(service, 'createMovie').mockResolvedValue(mockMovie);
    
    // Aquí también pasamos id y title
    const result = await controller.createMovie({ id: 1, title: 'Test' });
    expect(result).toEqual(mockMovie);
  });
});