import React, { useState, useEffect } from 'react';
import './pageComponent.css';
import { useRecoilState } from 'recoil';
import { continueOptionsState, continueQuestionState, continueStoryState, wholeStoryState } from '../../states/bookItemsState';
import { addPageState } from '../../states/pageState';

function PageComponent(props: any) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [wordsIndex, setWordsIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [continueStory, setContinueStory] = useRecoilState(continueStoryState);
  const [continueQuestion, setContinueQuestion] = useRecoilState(continueQuestionState);
  const [continueOptions, setContinueOptions] = useRecoilState<string[]>(continueOptionsState);
  const [wholeStory, setWholeStory] = useRecoilState(wholeStoryState);
  const [addPage,setAddPage]=useRecoilState(addPageState);



  useEffect(() => {
    if (!props.story) return; // If no story part, do nothing
      const words = props.story.split(' ');
      const intervalId = setInterval(() => {
      setWordsIndex((prevIndex) => {
        if (prevIndex < words.length) {
          setDisplayedWords((prevWords) => [...prevWords, words[prevIndex]]);
          return prevIndex + 1;
        } else {
          clearInterval(intervalId);
          setShowQuestions(true);
          return prevIndex; // Return prevIndex when words are finished
        }
      });
    }, 70); // Adjust the speed of word display as needed

  }, [props.story]);



  

  const handleOptionClick = (story: any, question: string, option: string) => {
    console.log("clicked: " + option);
    setShowQuestions(false);
    sendDataToBackend(story, question, option);
  };

  const sendDataToBackend = async (story: string, question: string, option: string) => {
    const data = {
      story,
      question,
      option
    };

    try {
      const response = await fetch('http://localhost:8000/api/storyteller/yourStory', {
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
      setContinueQuestion(result.question);
      const options = [result.options.i, result.options.ii, result.options.iii];
      setContinueOptions(options);
      console.log(result.story);
      console.log(result.question);
      console.log(options);

      setContinueStory(result.story);

      setWholeStory((prevStory:any) => ({
        ...prevStory,
        story: (prevStory.story || '') + ' ' + result.story,
      }));
     
      

    } catch (error) {
      console.error('Error:', error);
      setShowQuestions(true);
    }
  };

  const streamContinueStory = (story: string) => {
    const words = story.split(' ');
    const intervalId = setInterval(() => {
      setWordsIndex((prevIndex) => {
        if (prevIndex < displayedWords.length + words.length) {
          setDisplayedWords((prevWords) => [...prevWords, words[prevIndex - displayedWords.length]]);
          return prevIndex + 1;
        } else {
          clearInterval(intervalId);
          setShowQuestions(true);
          return prevIndex; // Return prevIndex when words are finished
        }
      });
    }, 70); // Adjust the speed of word display as needed
    
    return () => {
      clearInterval(intervalId);
      
    };
  };
  useEffect(()=>{
    console.log("lenght",wholeStory.story.length)
    if(wholeStory.story.length>400*addPage){
      console.log('hiiiiii');
      const wordsPerPage = 400; // Adjust this value as needed
      const totalWords = wholeStory.story.length;
      const pageCount = Math.ceil(totalWords / wordsPerPage);

      // console.log(`Total words: ${totalWords}`);
      // console.log(`Page count: ${pageCount}`);

      if (pageCount > 1) {
        setAddPage(pageCount);
        // console.log(`Next page content starts at word ${(pageCount - 1) * wordsPerPage + 1}`);
      }
  
    }else if(props.number == addPage){
      streamContinueStory(continueStory)
      console.log('byeeeee')
    }
  },[wholeStory,continueStory])
  return (
    <div className="content">
      <div className='storycontent'>
        <div className="storyDiv">
          {displayedWords.join(' ')}
        </div>
        {showQuestions && (
          <>
            <div style={{textAlign:'center',padding:'20px'}}>
   
              {continueQuestion ? (
                <div className="questionDiv">
                  {continueQuestion}
                </div>
              ) : (
                <div className="questionDiv">
                  {props.question}
                </div>
              )}
              {continueOptions && continueOptions.length !== 0 ? (
                <div className="optionContainer">
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, continueQuestion, continueOptions[0])}>
                    {continueOptions[0]}
                  </div>
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, continueQuestion, continueOptions[1])}>
                    {continueOptions[1]}
                  </div>
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, continueQuestion, continueOptions[2])}>
                    {continueOptions[2]}
                  </div>
                </div>
              ) : (
                <div className="optionContainer">
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, props.question, props.options[0])}>
                    {props.options[0]}
                  </div>
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, props.question, props.options[1])}>
                    {props.options[1]}
                  </div>
                  <div className="optionDiv" onClick={() => handleOptionClick(wholeStory, props.question, props.options[2])}>
                    {props.options[2]}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PageComponent;
