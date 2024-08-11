import  { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.css'
import DropDown from '../dropDown/dropDown';
import converFront from '../../assets/stories/bookfront2.png';
import converBack from '../../assets/stories/bookback.png';
import page from '../../assets/stories/pagealinbgrem.png';
import CharacterPrompts from '../inputPrompt/inputPrompt';
import {useRecoilState} from 'recoil';
import { bookFlipOnOptionState, bookFlipState } from '../../states/bookFlipState';
import { dropdownData } from '../../data/dropDownData';
import { genreState, settingState, lengthState, ageState, characterState, topicState } from '../../states/dropDownState';
import { continueOptionsState, continueQuestionState, continueStoryState, optionsState, questionState, storyState, titleState, wholeStoryState } from '../../states/bookItemsState';
import PageComponent from '../page/pageComponent';
import { addPageState } from '../../states/pageState';
import * as React from 'react';
import { bookOpenStatus } from '../../states/bookStatus';

const data={
  "title": "Echoes of the Bat",
  "story": "Neo-Gotham, 2149. The city, a jungle of shimmering chrome and pulsating neon, hummed with a deceptive tranquility. Beneath the sleek facade, whispers of unrest flickered like glitches in the system. The once-revered Batman, a fading myth, had vanished decades ago, leaving behind a legacy shrouded in mystery and a void yet to be filled. Tom, a gifted tech artisan haunted by a fragmented past, found himself thrust into the heart of this enigmatic city. His only solace, a dilapidated workshop inherited from his grandfather, held secrets that stretched back to the Dark Knight himself. When a cryptic message, encoded with a familiar bat insignia, appeared on Tom's datapad, his world tilted on its axis. The message was a desperate plea for help, echoing from a ghost of the past. It spoke of a hidden truth, a conspiracy threatening to plunge Neo-Gotham into an era of unprecedented darkness. Driven by a sense of duty he couldn't ignore, Tom delved deeper into the enigma, unraveling forgotten archives and chasing after digital shadows. The closer he got, the more he realized his grandfather's workshop wasn't just a haven, it was a vault – containing the last vestiges of the Batman's arsenal.",
  "question": "Will Tom heed the call, stepping into the shadows of his lineage to become the hero Neo-Gotham desperately needs?",
  "options": {
    "i": "Tom, overwhelmed by the responsibility and fearing for his own safety, chooses to ignore the message, burying himself further into his work.",
    "ii": "Intrigued but cautious, Tom decides to investigate the message's origin, utilizing his tech skills to uncover the truth without revealing himself.",
    "iii": "Embracing his legacy, Tom delves headfirst into the mystery, utilizing his grandfather's hidden arsenal to become the new guardian of Neo-Gotham."
  }
}

const PageCover = React.forwardRef((props:any, ref:any) => {
  const [isBookFlip,setIsBookFlip]=useRecoilState(bookFlipState);
  const [genre, setGenre] = useRecoilState(genreState);
  const [setting, setSetting] = useRecoilState(settingState);
  const [length, setLength] = useRecoilState(lengthState);
  const [age, setAge] = useRecoilState(ageState);
  const [topic, setTopic] = useRecoilState(topicState)
  const [characters, setCharacters] = useRecoilState(characterState);
  
  const [title,setTitle]=useRecoilState(titleState);
  const [story,setStory]=useRecoilState(storyState);
  const [question,setQuestion]=useRecoilState(questionState);
  const [options,setOptions]=useRecoilState(optionsState);
  
  const [bookOpen,setBookOpen]=useRecoilState(bookOpenStatus);

  function setBookFlip(){
    sendDataToBackend();
  }

  const sendDataToBackend = async () => {
    const data = {
      topic,
      genre,
      age,
      setting,
      characters,
      length
    };

    try {
      const response = await fetch('http://localhost:8000/api/storyteller/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setTitle(result.title);
      setStory(result.story);
      setQuestion(result.question);
      const options=[result.options.i,result.options.ii,result.options.iii];
      setOptions(options);
      setIsBookFlip(true);
      setBookOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        {title ? (
          <div className="titleCover">{title}</div>
        ):
        (
          <div className="HeadingCover">{props.children}</div>
        )
        }
        
        {!isBookFlip ? (
          <div className='buttonsBg'>
            <div className="dropdownCollection">
            {dropdownData.map((dropdown, index) => (
              <DropDown key={index} data={dropdown} />
            ))}
            </div>
            
            <div><CharacterPrompts /></div>
            <button className="submit-button" onClick={setBookFlip}>
              Make it Happen!
            </button>
          </div>
        ) : (
          <div className="instructionDiv">
            Flip the cover to start reading -----{'>'}
          </div>
        )}
        <div className='coverdiv'>
          <img className='h-[790px] w-[780px]' src={converFront} alt="" />
        </div>
      </div>
    </div>
  );
});

const PageCoverLast = React.forwardRef((props:any, ref:any) => {




  return (
    <div className="page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <div className='coverdiv'>
          <img className='h-[725px] w-[780px]' src={converBack} alt="" />
        </div>
      </div>
    </div>
  );
});




const Page = React.forwardRef((props:any, ref:any) => {
  return (

    <div ref={ref}> 
      <div className='internalpage'>
        <div className=' h-[725px]' style={{borderLeft: '0',boxShadow: 'inset 7px 0 30px -7px rgba(0, 0, 0, .4)',backgroundColor: 'hsl(32, 38%, 91%)',
       border: '1px solid #c2b5a3',
    overflow: 'hidden'}}></div>
      </div>
      <PageComponent story={props.story} question={props.question} options={props.options}></PageComponent>

      <div className="pageNumber">Page number: {props.number}</div>
    </div>
  );
});


Page.displayName="Page"
function MyBook() {
  const [story,setStory]=useRecoilState(storyState);
  const [question,setQuestion]=useRecoilState(questionState);
  const [options,setOptions]=useRecoilState(optionsState);
  const [isBookFlip]=useRecoilState(bookFlipState);
  const [pages, setPages] = useState<any>([]);
  const [wholeStory, setWholeStory] = useRecoilState(wholeStoryState);
  const [addPage,setAddPage]=useRecoilState(addPageState);
  const [continueStory, setContinueStory] = useRecoilState(continueStoryState);
  const [continueQuestion, setContinueQuestion] = useRecoilState(continueQuestionState);
  const [continueOptions, setContinueOptions] = useRecoilState<string[]>(continueOptionsState);


  
  useEffect(() => {
    if (story) {
      const storyPages = [];
      let currentPageNumber = 1;
      setWholeStory({story,question,options});
        storyPages.push(
          <Page
            key={currentPageNumber}
            number={currentPageNumber}
            story={story}
            question={question}
            options={options}
          />
        );

        setPages(storyPages);
  
      }
  }, [story]);


  useEffect(() => {
    if (addPage && wholeStory.story) {
  
      const newPage = (
        <Page
          key={`page-${addPage}`}
          number={addPage}
          story={continueStory}
          question={continueQuestion}
          options={continueOptions}
        />
      );
  
      setPages((prevPages:any) => [...prevPages, newPage]);
    }
  }, [addPage]);
  
  return (
      <HTMLFlipBook
      key={isBookFlip} 
      width={600}
      height={700}
      className=""
      style={{}}
      startPage={0}
      size="fixed"
      minWidth={600}
      maxWidth={1200}
      minHeight={800}
      maxHeight={1600}
      flippingTime={1000}
      usePortrait={true}
      startZIndex={1}
      maxShadowOpacity={0.2}
      showCover={true}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={isBookFlip}
      swipeDistance={20}
      showPageCorners={true}
      disableFlipByClick={true}
      renderOnlyPageLengthChange={false}
      >
        <PageCover number="0">Your Stories</PageCover>
        {pages}
        <PageCoverLast number="900000000">Your Stories</PageCoverLast>
</HTMLFlipBook>

    
  );
}
export default MyBook;