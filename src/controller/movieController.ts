import { movie2 } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/db';
import { movieSchemaType,getMovieSchematype } from '../zod-schema/movieShema';

export const getMovietHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await prisma.movie2.findMany();
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error !' });
  }
};
export const getOneMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query as getMovieSchematype;
    const movie = await prisma.movie2.findUnique({
      where: { id },
    });

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error !' });
  }
};

export const addMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as movie2;

    await prisma.movie2.create({
      data: newMovie,
    });
    return res.status(201).json({ message: 'New Movie added !' });
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == 'P2002') {
      return res.status(400).json({
        message: 'You Movie have been used before',
      });
    }
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};

export const updateMovieHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMovie = req.body as movie2;
    const { id } = req.params ;

    await prisma.movie2.update({
      where: { id },
      data: newMovie,
    });
    return res.status(200).json({ message: 'Movie updated' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};

export const deleteMovieHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params ;

    await prisma.movie2.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'movie Deleted !' });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error !',
    });
  }
};