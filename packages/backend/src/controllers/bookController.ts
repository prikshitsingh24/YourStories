import { Request, Response } from 'express';
import Book from '../models/books';
import User from '../models/user';

// Controller to add a new book to a user
export const addBook = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, data } = req.body;

  try {
    // Ensure the user exists before adding a book
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create and save the new book
    const newBook = new Book({ title, data, userId });
    await newBook.save();

    return res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get all books for a user
export const getBooksByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Find books associated with the user
    const books = await Book.find({ userId }).select('title _id');

    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
// Controller to get books by title (exact match and similar)
export const getBooksByTitle = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title } = req.query;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required for search' });
    }

    // Find exact matches for the title
    const exactMatches = await Book.find({
      userId,
      title: new RegExp(`^${title}$`, 'i') // Exact match (case-insensitive)
    }).select('title _id'); // Include only title and _id fields

    // Find similar titles using a regular expression
    const similarMatches = await Book.find({
      userId,
      title: { $regex: title as string, $options: 'i' }, // Case-insensitive search
      _id: { $nin: exactMatches.map(book => book._id) } // Exclude exact matches from similar results
    }).select('title _id'); // Include only title and _id fields

    return res.status(200).json({ exactMatches, similarMatches });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    // Find the book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
// delete books as per user and bookids
export const deleteBooks = async (req: Request, res: Response) => {
  const { userId } = req.params; // Assuming userId is part of the URL params
  const { ids } = req.body; // Array of book IDs to delete

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No book IDs provided for deletion' });
  }

  try {
    // Ensure that the IDs are valid and exist in the database
    const result = await Book.deleteMany({
      _id: { $in: ids },
      userId: userId // Optional: Ensure books belong to the specified user
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No books found to delete' });
    }

    return res.status(200).json({ message: 'Books deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

