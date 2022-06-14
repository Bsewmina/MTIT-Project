import mongoose from 'mongoose';

interface BookAttributes {
  book_name: string;
  book_author: String;
  pub_year: number;
  book_price: number;
  book_isbn: string;
}

interface CategotyModel extends mongoose.Model<BookDoc> {
  build(attributes: BookAttributes): BookDoc;
}

interface BookDoc extends mongoose.Document {
  book_name: string;
  book_author: String;
  pub_year: number;
  book_price: number;
  book_isbn: string;
}

const BookSchema = new mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
    },
    book_author: {
      type: String,
      require: true,
    },
    pub_year: {
      type: Number,
      required: true,
    },
    book_price: {
      type: Number,
      required: true,
    },
    book_isbn: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BookSchema.statics.build = (attributes: BookAttributes) => {
  return new Book(attributes);
};

const Book = mongoose.model<BookDoc, CategotyModel>('Book', BookSchema);

export { Book };
