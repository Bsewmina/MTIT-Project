import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Book } from '../models/Book';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const book = await Book.find({});
  res.send(book);
});

router.post(
  '/',
  [
    body('book_name').not().isEmpty().withMessage('Please enter a category name.'),
    body('book_author').not().isEmpty().withMessage('please enter a category Code'),
    body('pub_year').not().isEmpty().withMessage('Please enter a category name.'),
    body('book_price').not().isEmpty().withMessage('please enter a category Code'),
    body('book_isbn').not().isEmpty().withMessage('please enter a category Code'),
  ],
  async (req: Request, res: Response) => {
    // const validate = validationResult(req);

    // if (validate) {
    //   res.status(400).send(validate);
    //   console.log(validate);
    // }

    // check if the book already exists
    let isAvailable = await Book.findOne({ book_isbn: req.body.book_isbn });

    if (isAvailable) {
      res.status(400).send(' Book already exists');
    }

    const book = await Book.build({
      book_name: req.body.book_name,
      book_author: req.body.book_author,
      pub_year: req.body.pub_year,
      book_price: req.body.book_price,
      book_isbn: req.body.book_isbn,
    });

    try {
      await book.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).send(book);
  }
);

// search book by name
router.get('/:name', async (req: Request, res: Response) => {
  const book = await Book.findOne({ book_name: req.params.name });
  if (!book) {
    //throw new Error('Not available');
    res.status(400).send('Not available');
  }
  res.status(200).send(book);
});

router.get('/author/:author', async (req: Request, res: Response) => {
  const book = await Book.find({ book_author: req.params.author });
  if (book.length <= 0) {
    res.status(400).send('Not available');
  } else res.status(200).send(book);
});

router.delete('/:isbn', async (req: Request, res: Response) => {
  const book = await Book.findOne({ book_isbn: req.params.isbn });
  if (!book) {
    res.status(400).send('Not available');
  } else {
    await book.remove({ book_isbn: req.params.isbn });
    res.send('Book ISBN : ' + book.book_isbn + ' successfully Removed');
  }
});

router.put(
  '/:isbn',
  [
    body('book_name').not().isEmpty().withMessage('Please enter a category name.'),
    body('book_author').not().isEmpty().withMessage('please enter a category Code'),
    body('pub_year').not().isEmpty().withMessage('Please enter a category name.'),
    body('book_price').not().isEmpty().withMessage('please enter a category Code'),
    body('book_isbn').not().isEmpty().withMessage('please enter a category Code'),
  ],

  async (req: Request, res: Response) => {
    const book = await Book.findOne({ book_isbn: req.params.isbn });
    if (!book) {
      //throw new Error('NOt available');
      res.status(400).send('Not available');
    } else {
      book.set({
        book_name: req.body.book_name,
        book_author: req.body.book_author,
        pub_year: req.body.pub_year,
        book_price: req.body.book_price,
        book_isbn: req.body.book_isbn,
      });

      await book.save();
      res.status(201).send(book);
    }
  }
);

export { router as bookRouter };
