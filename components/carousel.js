import React, { useEffect } from 'react'
import EmblaCarousel from './embla/EmblaCarousel'
export default function Carousel({ posts }) {
    return (
        <EmblaCarousel slides={posts}></EmblaCarousel>
    )
}