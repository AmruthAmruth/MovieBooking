import express from 'express'
import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movie-controllers.js'

const movieRouter = express.Router()

movieRouter.post('/',addMovie)
movieRouter.get('/:id',getMovieById)
movieRouter.get('/',getAllMovies)
movieRouter.put('/:id',updateMovie)
movieRouter.delete('/:id',deleteMovie)
export default movieRouter  