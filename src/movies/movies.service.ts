import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto'; // Asegúrate de que esta ruta sea correcta

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  // --- NUEVO MÉTODO PARA GUARDAR ---
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.movieRepo.create(createMovieDto);
    return await this.movieRepo.save(newMovie);
  }

  // Tu método actual para listar
  async listMovies(): Promise<Movie[]> {
    return this.movieRepo.find({ order: { id: 'ASC' } });
  }
}
