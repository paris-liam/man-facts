import React from 'react';
import { useState, useEffect, useRef } from 'react'

export default function Carousel({ posts }) {
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const numberOfSlides = posts.length || 0;
  const [slidePositions, setSlidePositions] = useState(Array(numberOfSlides).fill(0));

  useEffect(() => {
    window.addEventListener('resize', findSlideWidth);
    findSlideWidth();
  }, []);
  
  const findSlideWidth = () => {
    const slide = slideRefs.current[0];
    const computedSlideWidth = slide.getBoundingClientRect().width;
    setSlideWidth(computedSlideWidth);
    resetSlidePositions(computedSlideWidth)
  }

  const resetSlidePositions = (computedSlideWidth, reverse) => {
    let newPositions = slidePositions.map((_position, index) => {
      return index * computedSlideWidth;
    });

    return reverse ? setSlidePositions(newPositions.reverse()) : setSlidePositions(newPositions);
  }

  const moveSlide = (direction) => {
    let newSlideIndex = direction + activeIndex;
    if (newSlideIndex < 0) {
      newSlideIndex = numberOfSlides - 1;
      resetSlidePositions(slideWidth, true);
      return setActiveIndex(newSlideIndex);
    }
    else if (newSlideIndex >= numberOfSlides) {
      newSlideIndex = 0;
      resetSlidePositions(slideWidth);
      return setActiveIndex(newSlideIndex);
    }

    setActiveIndex(newSlideIndex);
    let newPositions = slidePositions.map((_position, index) => {
      if(index === newSlideIndex) {
          return 0;
      }
      return (index - newSlideIndex) * slideWidth;
    });
    return setSlidePositions(newPositions);
  }

  return (
    <div className='carousel'>
      <button onClick={() => { moveSlide(1) }} className='carousel__button carousel__button--left'><i class="fa-solid fa-arrow-left"></i></button>
      <div className='carousel__track-container'>
        <ul className='carousel__track'>
          {posts.map((post, index) => (
            <li ref={ref => slideRefs.current.push(ref)} key={`carousel-slide-${index}`} style={{ left: slidePositions[index] + 'px' }} className={`carousel__slide`}>
              <img src={post.image.url}/> 
              <h2 className='carousel-slide-title'>{post.title}</h2>       
              <div className='carousel-slide-overlay'></div>    
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => { moveSlide(-1) }} className='carousel__button carousel__button--right'><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  );
}
