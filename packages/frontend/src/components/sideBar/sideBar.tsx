
import { Trash2 as TrashIcon, CheckCircle as CheckIcon } from 'lucide-react'; // Add these imports for icons
import AddIcon from '../../assets/stories/addIcon.png';
import BookShelf from '../shelf/bookShelf';
import { dividerClasses } from '@mui/material';

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  books: { title: string; _id: string }[]; 
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  deleteMode: boolean;
  onDeleteModeToggle: () => void;
  onBookSelect: (bookId: string) => void;
  onDeleteBooks: () => void;
  selectedBooks: Set<string>;
  onOpenBook: (bookId: string) => void;
}> = ({ 
  isOpen, 
  books, 
  setSearchTerm,
  deleteMode,
  onDeleteModeToggle,
  onBookSelect,
  onDeleteBooks,
  selectedBooks,
  onOpenBook
}) => {
  function addNewStory(event: any): void {
    window.location.reload();
  }

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
      <div className={`sidebar-icons${isOpen ? '-expanded' : ''}`}>
        <div className={`icon_setting${isOpen ? '-expanded' : ''}`}><img width='25' src={AddIcon} alt="Settings"onClick={addNewStory}/>
          {isOpen && <div onClick={addNewStory}>
            Add New Story
          </div> }
        </div>
        <div className={`icon_delete${deleteMode ? '-red' : ''}`} onClick={onDeleteModeToggle}>
          <TrashIcon size={24} />
        </div>
        {deleteMode && selectedBooks.size > 0 && (
          <div className="icon_confirm" onClick={onDeleteBooks}>
            <CheckIcon size={24} />
          </div>
        )}
      </div>
      <div className={`sidebar-content${isOpen ? '-expanded' : ''}`} style={{ marginTop: '20px' }}>
        <input
          type="text"
          className="search-input p-2 mb-4 w-full rounded-md border-4 border-solid border-black" 
          placeholder="Search books..."
          style={{ color: "white", backgroundColor: "#3b81f5" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BookShelf
          books={books}
          deleteMode={deleteMode}
          onBookSelect={onBookSelect}
          selectedBooks={selectedBooks}
          isOpen={isOpen}
          onOpenBook={onOpenBook}
        />
      </div>
    </div>
  );
};

export default Sidebar;
