// import { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import shelfImage from '../../assets/stories/shelf.png';



// // Import all book images
// import bookImage1 from '../../assets/stories/booksideblue.png';
// import bookImage2 from '../../assets/stories/booksideyellow.png';
// import bookImage3 from '../../assets/stories/booksidered.png';
// import bookImage4 from '../../assets/stories/booksidegreen.png';
// import bookImage5 from '../../assets/stories/booksideblue.png';
// import bookImage6 from '../../assets/stories/bookside2brown.png';
// import bookImage7 from '../../assets/stories/bookside2blue.png';
// import bookImage8 from '../../assets/stories/bookside2green.png';
// import bookImage9 from '../../assets/stories/bookside2brown.png';
// import bookImage10 from '../../assets/stories/bookside2.png';
// // Array of all book images
// const bookImages = [bookImage1, bookImage2, bookImage3, bookImage4, bookImage5,bookImage6,bookImage7,bookImage8,bookImage9,bookImage10];

// const Book: any = ({ title }: any) => {
//   // Select a random image from the array
//   const randomImage = bookImages[Math.floor(Math.random() * bookImages.length)];
  
//   // Function to get the first 2-3 words of the title
//   const getShortTitle = (title: string) => {
//     const words = title.split(' ');
//     return words.slice(0, 3).join(' '); // Get the first 2-3 words
//   };

//   const shortTitle = getShortTitle(title);

//   return (
//     <div
//       className="relative bg-contain rounded shadow-md overflow-hidden group"
//       style={{ backgroundImage: `url(${randomImage})`, width: '52px', height: '220px' }}
//     >
//       {/* Partial Title - Always Visible */}
//       <div className="absolute inset-0 flex items-center justify-center transform -rotate-90 origin-center">
//         <span className="text-white text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-2">
//           {shortTitle}
//         </span>
//       </div>
      
//       {/* Full Title - Visible on Hover */}
//       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs font-semibold p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         {title}
//       </div>
//     </div>
//   );
// };





// const BookShelf:any = ({ books }:any) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const booksPerPage = 24; // 3 rows * 8 books
//   const totalPages = Math.ceil(books.length / booksPerPage);

//   const startIndex = currentPage * booksPerPage;
//   const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);

//   const nextPage = () => {
//     setCurrentPage((prev) => (prev + 1) % totalPages);
//   };

//   const prevPage = () => {
//     setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
//   };

//   return (
//     <div className=" max-w-3xl mx-auto">
//       <div className="relative  w-full h-[200px]  bg-contain  bg-center p-1 rounded-lg shadow-xl"style={{ backgroundImage: `url(${shelfImage})`, width:'470px', height:'700px'}}>
//         <div className="absolute ml-5 mt-3 h-full  grid grid-rows-4 gap-[14rem]">
//           {[...Array(3)].map((_, rowIndex) => (
//             <div key={rowIndex} className="flex justify-between">
//               {displayedBooks.slice(rowIndex * 8, rowIndex * 8 + 8).map((book:any, index:any) => (
//                 <Book key={index} title={book.title} />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={prevPage}
//           className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <span className="text-lg font-semibold text-black">
//           Page {currentPage + 1} of {totalPages}
//         </span>
//         <button
//           onClick={nextPage}
//           className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookShelf;

import { ChevronLeft, ChevronRight } from 'lucide-react';
import shelfImage from '../../assets/stories/shelf.png';
import bookImage1 from '../../assets/stories/booksideblue.png';
import bookImage2 from '../../assets/stories/booksideyellow.png';
import bookImage3 from '../../assets/stories/booksidered.png';
import bookImage4 from '../../assets/stories/booksidegreen.png';
import bookImage5 from '../../assets/stories/booksideblue.png';
import bookImage6 from '../../assets/stories/bookside2brown.png';
import bookImage7 from '../../assets/stories/bookside2blue.png';
import bookImage8 from '../../assets/stories/bookside2green.png';
import bookImage9 from '../../assets/stories/bookside2brown.png';
import bookImage10 from '../../assets/stories/bookside2.png';
import * as React from 'react';

const bookImages = [bookImage1, bookImage2, bookImage3, bookImage4, bookImage5, bookImage6, bookImage7, bookImage8, bookImage9, bookImage10];

const Book: React.FC<{ title: string; _id: string; deleteMode: boolean; isSelected: boolean; onBookSelect: (bookId: string) => void }> = ({ title, _id, deleteMode, isSelected, onBookSelect }) => {
  const randomImage = bookImages[Math.floor(Math.random() * bookImages.length)];

  const getShortTitle = (title: string) => {
    const words = title.split(' ');
    return words.slice(0, 3).join(' ');
  };

  const shortTitle = getShortTitle(title);

  return (
    <div
      className={`relative bg-contain rounded shadow-md overflow-hidden group ${deleteMode && isSelected ? 'bg-red-500' : ''}`}
      style={{ backgroundImage: `url(${randomImage})`, width: '52px', height: '220px' }}
      onClick={() => deleteMode && onBookSelect(_id)}
    >
      {/* Partial Title - Always Visible */}
      <div className="absolute inset-0 flex items-center justify-center transform -rotate-90 origin-center">
        <span className="text-white text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-2">
          {shortTitle}
        </span>
      </div>
      
      {/* Full Title - Visible on Hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs font-semibold p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {title}
      </div>

      {/* Delete Indicator - Visible only in delete mode and when selected */}
      {deleteMode && isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-black text-xs font-semibold p-2 opacity-80">
          DELETE
        </div>
      )}
    </div>
  );
};

const BookShelf: React.FC<{ books: { title: string; _id: string }[], deleteMode: boolean; onBookSelect: (bookId: string) => void; selectedBooks: Set<string>;isOpen:any }> = ({ books, deleteMode, onBookSelect, selectedBooks,isOpen }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const booksPerPage = 24; // 3 rows * 8 books
  const totalPages = Math.ceil(books.length / booksPerPage);

  const startIndex = currentPage * booksPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative w-full h-[200px] bg-contain bg-center p-1 rounded-lg shadow-xl border-4 border-solid border-black" style={{ backgroundImage: `url(${shelfImage})`, width: '470px', height: '700px' }}>
        <div className="absolute ml-5 mt-3 h-full grid grid-rows-4 gap-[14rem]">
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between">
              {displayedBooks.slice(rowIndex * 8, rowIndex * 8 + 8).map((book) => (
                <Book 
                  key={book._id} 
                  title={book.title} 
                  _id={book._id}
                  deleteMode={deleteMode}
                  isSelected={selectedBooks.has(book._id)}
                  onBookSelect={onBookSelect}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {isOpen?(
        <div className="mt-4 flex justify-between items-center">
        <button
          onClick={prevPage}
          className="bg-blue-500 text-white p-2 border-2 border-solid border-black rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-semibold text-black">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-blue-500 text-white p-2 border-2 border-solid border-black rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      ):(
        <div className="mt-4 flex justify-between items-center">
        
      </div>
      )}
    </div>
  );
};

export default BookShelf;
