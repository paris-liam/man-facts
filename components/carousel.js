import React from 'react';

export default function Carousel({posts}) {
  const navigate = (direction) => console.warn('ok');
  console.warn(posts);
  return (
    <div className='carousel'>
      <button onClick={navigate('left')}>Left</button>
      <button onClick={navigate('left')}>Right</button>
          {posts.map((post, index) => (
              <div className={`carousel-item ${index === 0 ? 'carousel-item-visible' : ''}`}>
                    <img src={post.image.url}/>
                    <h2>{post.title}</h2>
                    <div></div>
              </div>
          ))
          }
                     <div class="carousel-actions">
                <button id="carousel-button-prev" aria-label="Previous">+</button>
                <button id="carousel-button-next" aria-label="Next">-</button>
            </div>
            <div class="carousel-dots">
                <input class="dot selected-dot" type="radio" name="dot" checked />
                <input class="dot" type="radio" name="dot" />
                <input class="dot" type="radio" name="dot" />
            </div>
    </div>
  );
}
