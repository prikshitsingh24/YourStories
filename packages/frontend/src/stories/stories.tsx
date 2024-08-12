
// import { useState } from 'react';
// import './stories.css';
// import Setting from '../assets/stories/Setting.png';
// import MyBook from '../components/book/book';
// import BookShelf from '../components/shelf/bookShelf';

// const Stories: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [books, setBooks] = useState<{ title: string }[]>([]); // State to hold books

//   // Function to fetch books from the API
//   const fetchBooks = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/books/664c92b865e837ad8aaf7dfd/getbooks');
//       const data = await response.json();

//       if (response.ok && data.books) {
//         // Map API response to required format
//         const formattedBooks = data.books.map((book: { title: string }) => ({
//           title: book.title,
//         }));
//         setBooks(formattedBooks); // Update state with fetched books
//       } else {
//         console.error('Error fetching books:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   // Toggle sidebar open/close and fetch books when opening
//   const handleHamburgerClick = () => {
//     setIsOpen((prevState) => {
//       const newIsOpen = !prevState;
//       if (newIsOpen) {
//         fetchBooks(); // Fetch books only when the sidebar is being opened
//       }
//       return newIsOpen;
//     });
//   };

//   return (
//     <div className="yourstoriesBody">
//       <div className="stories">
//         <Hamburger onClick={handleHamburgerClick} />
//         <Sidebar isOpen={isOpen} books={books} />
//         <div className='bookBody'>
//           <MyBook />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Sidebar component with books passed as props
// const Sidebar: React.FC<{ isOpen: boolean, books: { title: string }[] }> = ({ isOpen, books }) => {
//   return (
//     <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
//       <div className="sidebar-icons">
//         <div className="icon_setting"><img width='20' src={Setting} alt="Settings" /></div>
//       </div>
//       <div className={`sidebar-content${isOpen ? '-expanded' : ''}`} style={{ marginTop: '130px' }}>
//         <BookShelf books={books} />
//       </div>
//     </div>
//   );
// };

// // Hamburger component
// const Hamburger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
//   return (
//     <div>
//       <div className="hamburger" onClick={onClick}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//     </div>
//   );
// };

// export default Stories;

// import { useState, useEffect } from 'react';
// import './stories.css';
// import Setting from '../assets/stories/Setting.png';
// import MyBook from '../components/book/book';
// import BookShelf from '../components/shelf/bookShelf';
// import { Trash2 as TrashIcon, CheckCircle as CheckIcon } from 'lucide-react'; // Add these imports for icons

// const Stories: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [books, setBooks] = useState<{ title: string }[]>([]); // State to hold all books
//   const [filteredBooks, setFilteredBooks] = useState<{ title: string }[]>([]); // State to hold filtered books
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input

//   // Function to fetch books from the API
//   const fetchBooks = async () => {
//     const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

//     if (!userId) {
//       console.error('User ID is missing');
//       return;
//     }

//     const url = `http://localhost:8000/api/books/${userId}/getbooks`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok && data.books) {
//         const formattedBooks = data.books.map((book: { title: string }) => ({
//           title: book.title,
//         }));
//         setBooks(formattedBooks);
//         setFilteredBooks(formattedBooks); // Initialize with all books
//       } else {
//         console.error('Error fetching books:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   // Effect to filter books based on searchTerm
//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredBooks(books); // Show all books if search term is empty
//     } else {
//       const lowercasedSearchTerm = searchTerm.toLowerCase();

//       // Exact matches (word-to-word match, sequence doesn't matter)
//       const exactMatches = books.filter(book => 
//         book.title.toLowerCase().split(' ').sort().join(' ').includes(
//           lowercasedSearchTerm.split(' ').sort().join(' ')
//         )
//       );

//       // Similar matches (letter-to-letter match)
//       const similarMatches = books.filter(book =>
//         book.title.toLowerCase().includes(lowercasedSearchTerm) &&
//         !exactMatches.includes(book)
//       );

//       // Combine exact matches and similar matches
//       setFilteredBooks([...exactMatches, ...similarMatches]);
//     }
//   }, [searchTerm, books]);

//   // Toggle sidebar open/close and fetch books when opening
//   const handleHamburgerClick = () => {
//     setIsOpen(prevState => {
//       const newIsOpen = !prevState;
//       if (newIsOpen) {
//         fetchBooks(); // Fetch books only when the sidebar is being opened
//       }
//       return newIsOpen;
//     });
//   };

//   return (
//     <div className="yourstoriesBody">
//       <div className="stories">
//         <Hamburger onClick={handleHamburgerClick} />
//         <Sidebar isOpen={isOpen} books={filteredBooks} setSearchTerm={setSearchTerm} />
//         <div className='bookBody'>
//           <MyBook />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Sidebar component with search input and books passed as props
// const Sidebar: React.FC<{ isOpen: boolean, books: { title: string }[], setSearchTerm: React.Dispatch<React.SetStateAction<string>> }> = ({ isOpen, books, setSearchTerm }) => {
//   return (
//     <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
//       <div className="sidebar-icons">
//         <div className="icon_setting"><img width='20' src={Setting} alt="Settings" /></div>
//       </div>
//       <div className={`sidebar-content${isOpen ? '-expanded' : ''}`} style={{ marginTop: '90px' }}>
//           <input
//             type="text"
//             className="search-input p-2 mb-4 w-full rounded-md" // Added rounded-md class
//             placeholder="Search books..."
//             style={{ // Added inline styles for colors
//               color: "white",
//               backgroundColor: "#3b81f5", // Optional: for white text on black background
             
//             }}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         <BookShelf books={books} />
//       </div>
//     </div>
//   );
// };

// // Hamburger component
// const Hamburger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
//   return (
//     <div>
//       <div className="hamburger" onClick={onClick}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//     </div>
//   );
// };

// export default Stories;

import { useState, useEffect } from 'react';
import './stories.css';
import Sidebar from '../components/sideBar/sideBar';
import MyBook from '../components/book/book';
import { useRecoilState } from 'recoil';
import { bookOpenStatus } from '../states/bookStatus';
import backgroundImage from '../assets/stories/background2.png'
import { fantasyState, mysteryState, scienceFictionState } from '../states/esterEggs';

import space from  '../assets/genreImges/sci-fi/space.png';
import space2 from  '../assets/genreImges/sci-fi/space2.png';
import space3 from  '../assets/genreImges/sci-fi/space3.png';
import space4 from '../assets/genreImges/sci-fi/space4.png';
import space5 from '../assets/genreImges/sci-fi/space5.png';



import fantasy2 from  '../assets/genreImges/fantasy/fantasy2.png';
import fantasy3 from  '../assets/genreImges/fantasy/fantasy3.png';
import fantasy4 from  '../assets/genreImges/fantasy/fantasy4.png';
import fantasy5 from  '../assets/genreImges/fantasy/fantasy5.png';

import mystery1 from '../assets/genreImges/mystery/mystery1.png';
import mystery2 from '../assets/genreImges/mystery/mystery2.png';
import mystery3 from '../assets/genreImges/mystery/mystery3.png';
import mystery4 from '../assets/genreImges/mystery/mystery4.png';
import { savedGenreState, savedStoryState, savedTitleState } from '../states/savedBook';
import converBack from '../assets/stories/bookback.png';



const Stories: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [books, setBooks] = useState<{ title: string; _id: string }[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<{ title: string; _id: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [savedTitle,setSavedTitle]=useRecoilState(savedTitleState);
  const [savedStory,setSavedStory]=useRecoilState(savedStoryState);

  const fetchBooks = async () => {
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //   console.error('User ID is missing');
    //   return;
    // }

    // const url = `http://localhost:8000/api/books/${userId}/getbooks`;
    // try {
    //   const response = await fetch(url);
    //   const data = await response.json();
    //   if (response.ok && data.books) {
    //     const formattedBooks = data.books.map((book: { title: string; _id: string }) => ({
    //       title: book.title,
    //       _id: book._id,
    //     }));
    //     setBooks(formattedBooks);
    //     setFilteredBooks(formattedBooks);
    //   } else {
    //     console.error('Error fetching books:', data.message);
    //   }
    // } catch (error) {
    //   console.error('Error fetching books:', error);
    // }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBooks();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();

      const exactMatches = books.filter(book => 
        book.title.toLowerCase().split(' ').sort().join(' ').includes(
          lowercasedSearchTerm.split(' ').sort().join(' ')
        )
      );

      const similarMatches = books.filter(book =>
        book.title.toLowerCase().includes(lowercasedSearchTerm) &&
        !exactMatches.includes(book)
      );

      setFilteredBooks([...exactMatches, ...similarMatches]);
    }
  }, [searchTerm, books]);

  const handleHamburgerClick = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(prev => !prev);
    setSelectedBooks(new Set()); // Clear selections when toggling mode
  };

  const handleBookSelect = (bookId: string) => {
    setSelectedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const handleDeleteBooks = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
  
    const idsToDelete = Array.from(selectedBooks);
  
    try {
      const response = await fetch(`http://localhost:8000/api/books/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: idsToDelete }),
      });
  
      if (response.ok) {
        setBooks(books.filter(book => !selectedBooks.has(book._id)));
        setFilteredBooks(filteredBooks.filter(book => !selectedBooks.has(book._id)));
        setSelectedBooks(new Set()); // Clear selections
      } else {
        console.error('Error deleting books:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting books:', error);
    }
  };


  const handleOpenBook = async (bookId:string)=>{
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/api/books/${bookId}/bookbyid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSavedStory(data.data);
        setSavedTitle(data.title);
        setSavedGenre(data.genre);
      } else {
        console.error('Error deleting books:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting books:', error);
    }
  }
  
  const [bookOpen,setBookOpen]=useRecoilState(bookOpenStatus);
  const [fantasy,setFantasy]=useRecoilState(fantasyState);
  const [scienceFiction,setScienceFiction]=useRecoilState(scienceFictionState);
  const [mystery,setMystery]=useRecoilState(mysteryState);
  const [savedGenre,setSavedGenre]=useRecoilState(savedGenreState);


  useEffect(()=>{
    if(savedGenre){
      switch(savedGenre){
        case 'sci-fi':
          setFantasy(false);
          setMystery(false);
          setScienceFiction(true);
          break;
        case 'mystery':
          setScienceFiction(false);
          setFantasy(false);
          setMystery(true);
          break;
        case 'fantasy':
          setScienceFiction(false);
          setMystery(false);
          setFantasy(true);
          break;
        
      }
        
    }
  },[savedGenre])

  useEffect(()=>{
    setTimeout(()=>{
      setIsOpen(false);
    },1000)
  },[])


  return (
    <div className="yourstoriesBody">
      {fantasy?(
        <>
        <img className='fantasy-2-image' src={fantasy2} alt="" />
        <img className='fantasy-3-image' src={fantasy3} alt="" />
        <img className='fantasy-4-image' src={fantasy4} alt="" />
        <img className='fantasy-5-image' src={fantasy5} alt="" />
        </>
      ):scienceFiction?(
        <>
        <img className='space-1-image' src={space} alt="" />
        <img className='space-2-image' src={space2} alt="" />
        <img className='space-3-image' src={space3} alt="" />
        <img className='space-4-image' src={space4} alt="" />
        <img className='space-5-image' src={space5} alt="" />
        </>
      ):mystery?(
        <>
        <img className='mystery-1-image' src={mystery1} alt="" />
        <img className='mystery-2-image' src={mystery2} alt="" />
        <img className='mystery-3-image' src={mystery3} alt="" />
        <img className='mystery-4-image' src={mystery4} alt="" />
        </>
      ):(
        <>
        </>
      )}
       {bookOpen && <div className="page-content">
        <div className='coverBackdiv'>
          <img className='h-[725px] w-[600px]' src={converBack} alt="" />
        </div>
      </div>}
      <img className="background-img" src={backgroundImage} alt="" />
      <div className="stories">
        <Hamburger onClick={handleHamburgerClick} />
        <Sidebar 
          isOpen={isOpen} 
          books={filteredBooks} 
          setSearchTerm={setSearchTerm}
          deleteMode={deleteMode}
          onDeleteModeToggle={toggleDeleteMode}
          onBookSelect={handleBookSelect}
          onDeleteBooks={handleDeleteBooks}
          selectedBooks={selectedBooks}
          onOpenBook={handleOpenBook}
        />
        <div className={`${bookOpen?'bookBody-open':'bookBody-closed'}`}>
           <MyBook />
         </div>
      </div>
    </div>
  );
};

const Hamburger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div>
      <div className="hamburger" onClick={onClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Stories;
