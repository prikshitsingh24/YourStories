
import { Trash2 as TrashIcon, CheckCircle as CheckIcon } from 'lucide-react'; // Add these imports for icons
import Setting from '../../assets/stories/Setting.png';
import BookShelf from '../shelf/bookShelf';

const Sidebar: React.FC<{ 
  isOpen: boolean; 
  books: { title: string; _id: string }[]; 
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  deleteMode: boolean;
  onDeleteModeToggle: () => void;
  onBookSelect: (bookId: string) => void;
  onDeleteBooks: () => void;
  selectedBooks: Set<string>;
}> = ({ 
  isOpen, 
  books, 
  setSearchTerm,
  deleteMode,
  onDeleteModeToggle,
  onBookSelect,
  onDeleteBooks,
  selectedBooks
}) => {
  return (
    <div className={`sidebar ${isOpen ? 'expanded' : ''}`}>
      <div className={`sidebar-icons${isOpen ? '-expanded' : ''}`}>
        <div className="icon_setting"><img width='25' src={Setting} alt="Settings"/></div>
        <div className={`icon_delete${deleteMode ? '-red' : ''}`} onClick={onDeleteModeToggle}>
          <TrashIcon size={24} />
        </div>
        {deleteMode && selectedBooks.size > 0 && (
          <div className="icon_confirm" onClick={onDeleteBooks}>
            <CheckIcon size={24} />
          </div>
        )}
      </div>
      <div className={`sidebar-content${isOpen ? '-expanded' : ''}`} style={{ marginTop: '50px' }}>
        <input
          type="text"
          className="search-input p-2 mb-4 w-full rounded-md" 
          placeholder="Search books..."
          style={{ color: "white", backgroundColor: "#3b81f5" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BookShelf
          books={books}
          deleteMode={deleteMode}
          onBookSelect={onBookSelect}
          selectedBooks={selectedBooks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
