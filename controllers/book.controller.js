import { Prisma, PrismaClient } from '@prisma/client';
import { response } from 'express';

const prisma = new PrismaClient()

export const deleteBook = async (request, response) => {
    try {
        const { id } = request.params; 
         await prisma.book.delete({
            where: { id }
        });

        response.status(200).json({
            message: "The book is gone"
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "It aint deleted"
        });
    }
};

export const getAllBooks = async (request, response) => {
    try {
        const books = await prisma.book.findMany();

        response.status(200).json({
            books
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Something went wrong, womp womp"
        });
    }
};
export const getBook = async (request, response) => {
    try {
        const { id } = request.params
        const book = await prisma.book.findUnique({
            where: { id }
        })

        if(book) {
            return response.status(404).json({
                message: "Book aint here girl"
            })
        }
        response.status(200).json({
            book
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Something went wrong, womp womp"
        });
    }
};

export const createBook = async (request, response) => {
    const { title, description, year, author, publisher } = request.body;

    try {

        const newBook = await prisma.book.create({
            date: {
                title: title,
                description: description,
                year: year,
                author: author,
                publisher: publisher,
            }
        })

        response.status(201).json({
            message: "GG you created a book",
        })

    }catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something went wrong, womp womp"
        })
    }
}

export const updateBook = async (request, response) => {
    const { title, description, year, author, publisher } = request.body;
    const { id } = request.paras;

    try {

        const updatedBook = await prisma.book.update({

            where: { id:Number(id) },
            data: {
                title,
                description,
                year,
                author,
                publisher
            }

        })
        
        response.status(200).json({
            message: "GG book is updated",
            updatedBook
        })
        
    }catch(error) {
        console.log(error)
        response.status(500).json({
            message: "Loser."
        })
    }
}