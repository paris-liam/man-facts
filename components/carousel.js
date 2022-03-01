import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";



// import required modules
import { Navigation } from "swiper";

export default function Carousel({posts}) {
  return (
    <div className="swiper-container">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {posts.map((post) => 
            <SwiperSlide>
                <div className="swiper-slide-container">              
                    <img className="swiper-slide-image" src={post.image}/>
                    <h2 className="swiper-slide-title">{post.title}</h2>
                    <div className='swiper-slide-overlay'></div>
                </div>
            </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
