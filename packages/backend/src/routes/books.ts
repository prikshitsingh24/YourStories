import { Router } from 'express';
import { addBook, deleteBooks, getBookById, getBooksByTitle, getBooksByUser } from '../controllers/bookController'; // Use named imports

const router = Router();

// Route to add a new book for a user
router.post('/:userId/addbooks', addBook);

// Route to get all books for a specific user
router.get('/:userId/getbooks', getBooksByUser);
// Route to get books by title (exact match and similar)
router.get('/:userId/search', getBooksByTitle);
// Route to get a book by its ID
router.get('/:bookId/bookbyid', getBookById);
// Route to delete multiple books by IDs
router.delete('/:userId/delete', deleteBooks);

export default router; // Ensure you're exporting the router correctly
