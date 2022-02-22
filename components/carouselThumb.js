import React from 'react'
import EmblaThumbCarousel from './embla/EmblaThumbCarousel'
export default function CarouselThumb({ posts }) {
    return (
        <EmblaThumbCarousel slides={posts}></EmblaThumbCarousel>
    )
}