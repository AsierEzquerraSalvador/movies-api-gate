import { Controller, Get, Post, Body } from '@nestjs/common'; // He añadido Post y Body aquí
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';

@ApiTags('movies')
@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({ type: CreateMovieDto, isArray: true })
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.listMovies();
  }

  // --- ESTO ES LO QUE TE FALTA ---
  @Post()
  @ApiCreatedResponse({
    type: CreateMovieDto,
    description: 'Crea una nueva película',
  })
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }
}
