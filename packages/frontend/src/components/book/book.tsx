import  { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.css'
import DropDown from '../dropDown/dropDown';
import pageTexture from '../../assets/stories/bookCovercrop.png';
import page from '../../assets/stories/pagealinbgrem.png';
import CharacterPrompts from '../inputPrompt/inputPrompt';
import {useRecoilState} from 'recoil';
import { bookFlipOnOptionState, bookFlipState } from '../../states/bookFlipState';
import { dropdownData } from '../../data/dropDownData';
import { genreState, settingState, lengthState, ageState, characterState, topicState } from '../../states/dropDownState';
import { optionsState, questionState, storyState, titleState, wholeStoryState } from '../../states/bookItemsState';
import PageComponent from '../page/pageComponent';
import { addPageState } from '../../states/pageState';
import * as React from 'react';



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
      console.log('Success:', result);
      setTitle(result.title);
      setStory(result.story);
      setQuestion(result.question);
      const options=[result.options.i,result.options.ii,result.options.iii];
      setOptions(options);
      setIsBookFlip(true);
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
          <img className='coverfront' height={710} width={610} src={pageTexture} alt="" />
        </div>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props:any, ref:any) => {
  return (
    <div className="demoPage1" ref={ref}> 
      <div className='internalpage'><img src={page} height={705} width={610} alt="" /></div>
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

  
  useEffect(() => {
    if (story) {
      const storyPages = [];
      let currentPageNumber = 1;
  
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
      let content = wholeStory.story.slice(1801);
      console.log(addPage);
      console.log("rest of the content " + content);
  
      const newPage = (
        <Page
          key={`page-${addPage}`}
          number={addPage}
          story={content}
          question={question}
          options={options}
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
      drawShadow={true}
      flippingTime={1000}
      usePortrait={true}
      startZIndex={1}
      autoSize={true}
      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={isBookFlip}
      swipeDistance={30}
      showPageCorners={true}
      disableFlipByClick={true}
      renderOnlyPageLengthChange={false}
      >
        <PageCover number="0">Your Stories</PageCover>
        {pages}
    
</HTMLFlipBook>

    
  );
}
export default MyBook;