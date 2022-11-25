import express from 'express';
import {
addMovieHandler,getMovietHandler,getOneMovieHandler,deleteMovieHandler,updateMovieHandler
} from '../controller/movieController'
import validate from '../middleWares/validate';
import { addMovieSchema,deleteMovieSchema,getMovieSchema,updateMovieSchema } from '../zod-schema/movieShema';

const router = express.Router();

router.get('/', getMovietHandler);
router.get('/one', validate(getMovieSchema), getOneMovieHandler);
router.post('/', validate(addMovieSchema), addMovieHandler);
router.put('/:id', validate(updateMovieSchema), updateMovieHandler);
router.delete('/:id', validate(deleteMovieSchema), deleteMovieHandler);

export default router;