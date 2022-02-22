import React, { useState, useEffect, useCallback } from "react";
import Thumb  from "./Thumb";
import useEmblaCarousel from "embla-carousel-react";

const EmblaThumbCarousel = ({ slides }) => {
    console.warn(slides);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
    dragFree: true
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla-thumb">
        <div className="embla-thumb__viewport" ref={mainViewportRef}>
          <div className="embla-thumb__container">
            {slides.map((slide) => (
              <div className="embla-thumb__slide" key={slide.title}>
                <div className="embla-thumb__slide__inner">
                  <img
                    className="embla-thumb__slide__img"
                    src={slide.image}
                    alt="A cool cat."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla-thumb embla-thumb--thumb">
        <div className="embla-thumb__viewport" ref={thumbViewportRef}>
          <div className="embla-thumb__container embla-thumb__container--thumb">
            {slides.map((slide,index) => (
<h1>ok</h1>
            ))}
          </div>
        </div>
            </div>
    </>
  );
};

export default EmblaThumbCarousel;
