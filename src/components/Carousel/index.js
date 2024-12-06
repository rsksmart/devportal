import React from "react";
import clsx from "clsx";
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Button from "/src/components/Button";
import styles from './styles.module.scss';

export default function Carousel({images = [], width = 370, height = 206, className, children, ...props}) {

  return (
    <Splide hasTrack={ false }
            className={clsx(className, styles.Carousel)}
            options={
              {
                pagination: false,
                perPage: 3,
                focus: 'center',
                updateOnMove : true,
                start: 1,
                trimSpace: false,
                breakpoints: {
                  767: {
                    perPage: 1,
                    start: 0,
                    gap: 12
                  },
                }
              }
            }
            style={{'--rsk-carousel-image-ratio': `${width} / ${height}`}}>
      <SplideTrack>
        {images.map((src, index) => (
            <SplideSlide key={index}>
              <div className="slide-wrap">
                <img src={src} alt={`Image ${index + 1}`} width={width} height={height}/>
              </div>
            </SplideSlide>
          )
        )}
        {children}
      </SplideTrack>
      <div className="splide__arrows justify-content-end d-flex gap-24 align-items-center pt-32">
        <Button className="splide__arrow splide__arrow--prev py-3 px-28" size={'sm'}>
          <svg width="24" height="24">
            <use xlinkHref="#icon-arrow-l"/>
          </svg>
        </Button>
        <Button className="splide__arrow splide__arrow--next py-3 px-28" size={'sm'}>
          <svg width="24" height="24">
            <use xlinkHref="#icon-arrow-r"/>
          </svg>
        </Button>
      </div>
    </Splide>
  )
}
