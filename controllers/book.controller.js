import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

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