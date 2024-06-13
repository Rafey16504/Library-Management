const express = require('express');
import { v4 as uuidv4 } from 'uuid';
import { CreateBookType, CreateBookTypeSchema } from './types/book';
import { ZodError } from 'zod';
import { convertToReadableError } from './zod-mapping';
export const bookRouter = express.Router();
const moment = require('moment');

const books:CreateBookType[] = []

enum BookStatus {
    BORROWED = "borrowed",
    NOT_BORROWED = "not borrowed"
}

const validate = (body: any): CreateBookType => {
    try {
        return CreateBookTypeSchema.parse(body);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error(convertToReadableError(error));
        } else {
            throw error;
        }
    }
}

bookRouter.post('/',(req:any,res:any)=>{
    try{
        const body = validate(req.body)
        for (let i=0;i<books.length;i++){
            if (books[i].title == body.title && books[i].author == body.author)
                return res.status(400).send({success: false, error: "Book Already Exists!"})
        }
        body.id = uuidv4().replace(/-/g, '')
        body.borrow_status = BookStatus.NOT_BORROWED
        books.push(body)
        
        return res.send(body)
    }
    catch (error: any) {
        console.log(error)
        return res.status(400).send({ error: error.message });
    }
})

bookRouter.get('/',(req:Request,res:any)=>{
    if (books.length == 0)
        return res.send(books)
    return res.send(books)
})

bookRouter.get('/:id',(req:any,res:any)=>{
    if (books.length == 0)
        return res.status(400).send({success: false, error: "No Book exists!"})
    const id = req.params.id
    const book = books.find((b)=>b.id === id)
    if (!book)
        return res.status(400).send({success: false, error: "No Book with this ID exists!"})
    const index = books.indexOf(book)
    return res.send(books[index])
})

bookRouter.delete('/:id',(req:any,res:any)=>{
    if (books.length == 0)
        return res.status(400).send({success: false, error: "No Book exists!"})
    const id = req.params.id
    const book = books.find((b)=>b.id === id)
    if (!book)
        return res.status(400).send({success: false, error: "No Book with this ID exists!"})
    const index = books.indexOf(book)
    const deleted_book = books[index]
    books.splice(index,1)
    return res.send({success:true, message: "Book removed!", book_details: deleted_book})
})

bookRouter.delete('/',(req:any,res:any)=>{
    res.status(400).send({success: false, error: "ID is required"});
});

bookRouter.post('/borrow/:id',(req:any,res:any)=>{
    if (books.length == 0)
        return res.status(400).send({success: false, error: "No Book exists!"})
    const id = req.params.id
    const book = books.find((b)=>b.id === id)
    if (!book)
        return res.status(400).send({success: false, error: "No Book with this ID exists!"})
    const index = books.indexOf(book)
    if (books[index].borrow_date)
        return res.send({success:true, message: "Book already borrowed!", book_details: books[index]})

    const currentTime = moment();
    books[index].borrow_date = currentTime.format('MMMM Do YYYY, h:mm:ss a')
    books[index].borrow_status = BookStatus.BORROWED
    return res.send(books[index])
})

bookRouter.post('/borrow',(req:any,res:any)=>{
    res.status(400).send({success: false, error: "ID is required"});
});

bookRouter.post('/return/:id',(req:any,res:any)=>{
    if (books.length == 0)
        return res.status(400).send({success: false, error: "No Book exists!"})
    const id = req.params.id
    const book = books.find((b)=>b.id === id)
    if (!book)
        return res.status(400).send({success: false, error: "No Book with this ID exists!"})
    const index = books.indexOf(book)
    if (!books[index].borrow_date)
        return res.status(400).send({success: false, error: "Book cannot be returned. You do not have it!"})

    books[index].borrow_date = null
    books[index].borrow_status = BookStatus.NOT_BORROWED
    return res.send(books[index])
})

bookRouter.post('/return',(req:any,res:any)=>{
    res.status(400).send({success: false, error: "ID is required"});
});