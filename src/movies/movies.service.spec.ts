import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity'; // Asegúrate de que esta ruta coincida con tu carpeta

describe('MoviesService', () => {
  let service: MoviesService;
  let repo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MoviesService>(MoviesService);
    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listMovies() devuelve lo que devuelve el repo', async () => {
    const data: Movie[] = [{ id: 1, title: 'Coco' } as Movie];
    jest.spyOn(repo, 'find').mockResolvedValue(data);
    const result = await service.listMovies();
    expect(result).toEqual(data);
  });

  it('createMovie() crea y devuelve la peli', async () => {
    const mockMovie = { id: 1, title: 'New' } as Movie;
    jest.spyOn(repo, 'create').mockReturnValue(mockMovie);
    jest.spyOn(repo, 'save').mockResolvedValue(mockMovie);
    
    // Le pasamos id y title para cumplir con tu CreateMovieDto al 100%
    const result = await service.createMovie({ id: 1, title: 'New' });
    expect(result).toEqual(mockMovie);
  });
});