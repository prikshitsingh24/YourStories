import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './book.css'
import DropDown from '../dropDown/dropDown';
import pageTexture from '../../assets/stories/bookCovercrop.png';
import page from '../../assets/stories/pagealinbgrem.png';
import CharacterPrompts from '../characterPrompt/characterPrompt';



const PageCover = React.forwardRef((props:any, ref:any) => {
  return (
    <div className="page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        
        <div className="HeadingCover">{props.children}</div>
        <div className='buttonsBg'>
              <div className='dropDownRow'>
              <div><DropDown title = "Genre"/></div>
              <div><DropDown title = "Setting"/></div>
              <div><DropDown title = "Length"/></div>  
              <div><DropDown title = "Age"/></div>  
          </div>
          <div className='dropDowncolumn'>
              <div><DropDown title = "Genre"/></div>
              <div><DropDown title = "Setting"/></div>
              <div><DropDown title = "Length"/></div>  
              <div><DropDown title = "Age"/></div> 

          </div>
          <div><CharacterPrompts/></div>
        </div>
        <div className='coverdiv'> <img className='coverfront' height={710} width={610} src={pageTexture} alt="" /></div>
       
        
      </div>
    </div>
  );
});
const Page = React.forwardRef((props:any, ref:any) => {
  return (
    <div className="demoPage1" ref={ref}> 
      <div className='internalpage'><img src={page} height={705} width={610} alt="" /></div>
      
      <div className="content">
        <div className='storycontent'>{props.children}</div>
      </div>
      <div className="pageNumber">Page number: {props.number}</div>
    </div>
  );
});


Page.displayName="Page"
function MyBook() {
  return (
    <HTMLFlipBook
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
    useMouseEvents={true}
    swipeDistance={30}
    showPageCorners={true}
    disableFlipByClick={false}
    renderOnlyPageLengthChange={false}
    
>
    <PageCover number="1">Your Stories</PageCover>
    <Page number="2">Page text 2</Page>
    <Page number="4">Page text 3</Page>
    <Page number="5">Page text 3</Page>
    <Page number="6">Page text 3</Page>
    <Page number="7">Page text 3</Page>
    <Page number="8">Page text 3</Page>
    
</HTMLFlipBook>
  );
}
export default MyBook;