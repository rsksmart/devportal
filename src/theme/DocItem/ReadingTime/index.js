import React, {useState, useEffect} from "react";
import styles from './styles.module.scss';

import clsx from "clsx";

export default function ReadingTime() {
  const [time, setTime] = useState(1);

  function readTime(content) {
    const WPS = 275 / 60

    let images = 0
    const regex = /\w/

    let words = content.split(' ').filter((word) => {
      if (word.includes('<img')) {
        images += 1
      }
      return regex.test(word)
    }).length

    let imageAdjust = images * 4
    let imageSecs = 0
    let imageFactor = 12

    while (images) {
      imageSecs += imageFactor
      if (imageFactor > 3) {
        imageFactor -= 1
      }
      images -= 1
    }

    const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)

    return minutes
  }

  useEffect(() => {
    const content = document.querySelector('.theme-doc-markdown')?.innerText || '';
    if (content) {
      setTime(readTime(content))
    }
  },[]);

  return (
    <div className={clsx(styles.readingTime, `fs-12`)}>
      Time to read: {time} min
    </div>
  )
}
