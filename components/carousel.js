import React from 'react';

export default function Carousel({posts}) {
  let activeIndex = 0;
  const numberOfSlides = posts.length;

  const moveSlide = (direction) => {
    activeIndex = activeIndex + direction;
    console.warn(activeIndex);
    if(activeIndex < 0) {
      return activeIndex = numberOfSlides - 1;
    } 
    if( activeIndex > numberOfSlides) {
      return activeIndex = 0;
    }
  }
  return (
    <div className='carousel'>
      <div className='carousel__track-container'>
        <button onClick={() => moveSlide(1)}className='carousel__button carousel__button--left'>+</button>
        <ul className='carousel__track'>
          {posts.map((post, index) => (
            <li className={`carousel__slide ${index === activeIndex ? 'active-slide' : ''}`}>
              <img src={post.image.url}/>
            </li>
          ))}
        </ul>
        <button onClick={() => moveSlide(-1)}className='carousel__button carousel__button--right'>-</button>
      </div>
    </div>
  );
}
