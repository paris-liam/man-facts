import Link from 'next/link';
import { useState, useEffect, useRef } from 'react'
import { formatLink } from '../lib/utils';

export default function Carousel({ posts }) {
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const numberOfSlides = posts.length || 0;
  const [slidePositions, setSlidePositions] = useState(Array(numberOfSlides).fill(0));
  const [runAutoPlay, setAutoPlay] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', findSlideWidth);
    findSlideWidth();
    const startAutoPlay = setTimeout(() => {
      console.warn('timeout called');
      return setAutoPlay(true)
    }, 5000);
    return () => clearTimeout(startAutoPlay);
  }, []);

  useEffect(() => {
    console.warn('setting autoplay to ', runAutoPlay)
  }, [runAutoPlay]);



  const findSlideWidth = () => {
    if (slideRefs.current[0]) {
      const slide = slideRefs.current[0];
      const computedSlideWidth = slide.getBoundingClientRect().width;
      setSlideWidth(computedSlideWidth);
      resetSlidePositions(computedSlideWidth, false)
    }
  }

  const resetSlidePositions = (computedSlideWidth, reverse) => {
    let newPositions = slidePositions.map((_position, index) => {
      return index * computedSlideWidth;
    });

    return reverse ? setSlidePositions(newPositions.reverse()) : setSlidePositions(newPositions);
  }

  const moveSlide = (direction, auto = false) => {
    if(!auto) {
      setAutoPlay(false);
    }
    console.warn('called');
    let newSlideIndex = direction + activeIndex;
    if (newSlideIndex < 0) {
      newSlideIndex = numberOfSlides - 1;
      resetSlidePositions(slideWidth, true);
      return setActiveIndex(newSlideIndex);
    }
    else if (newSlideIndex >= numberOfSlides) {
      newSlideIndex = 0;
      resetSlidePositions(slideWidth, false);
      return setActiveIndex(newSlideIndex);
    }

    setActiveIndex(newSlideIndex);

    let newPositions = slidePositions.map((_position, index) => {
      if (index === newSlideIndex) {
        return 0;
      }
      return (index - newSlideIndex) * slideWidth;
    });
    return setSlidePositions(newPositions);
  }

  return (
    <div className='carousel'>
      <button onClick={() => { moveSlide(1) }} className='carousel__button carousel__button--left'><i className="fa-solid fa-arrow-left"></i></button>
      <div className='carousel__track-container'>
        <ul className='carousel__track'>
          {posts.map((post, index) => (
            <Link key={`carousel-slide-${index}`} href={'posts/' + formatLink(post.title)}><li ref={ref => slideRefs.current.push(ref)} style={{ left: slidePositions[index] + 'px' }} className={`carousel__slide`}>
              <img src={post.image.url} />
              <h2 className='carousel-slide-title'>{post.title}</h2>
              <div className='carousel-slide-overlay'></div>
            </li></Link>
          ))}
        </ul>
      </div>
      <button onClick={() => { moveSlide(-1) }} className='carousel__button carousel__button--right'><i className="fa-solid fa-arrow-right"></i></button>
    </div>
  );
}
