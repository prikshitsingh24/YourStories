import mongoose, { Schema, Document } from 'mongoose';

// Interface for Book document
export interface IBook extends Document {
  title: string;
  data: string;
  userId: mongoose.Schema.Types.ObjectId;
}

// Book schema definition
const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    data: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Book model creation
const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
