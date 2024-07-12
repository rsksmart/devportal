import React, {useState, useRef} from "react";
import clsx from "clsx";
import styles from './styles.module.scss';

export default function Video ({url, thumbnail, title, className, ...props}) {
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);

  const [play, setPlay] = useState(false);
  const playVideo = () => {
    videoWrapRef.current.classList.add('active');

    if (videoRef.current) {
      videoRef.current.play();
    }
    setPlay(true);
  }

  function extractVideoID(url) {
    if (!url) return '';

    let regExp =    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return '';
    }
  }

  return (
    <div className={clsx(styles.VideoWrap, "ratio ratio-16x9")} ref={videoWrapRef}>
      {extractVideoID(url) ? (
        <iframe
          src={`https://www.youtube.com/embed/${extractVideoID(url)}${play ? '?autoplay=1' : ''}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          className="rounded-10"
        />
      ) : (
        <video controls={true} ref={videoRef}>
          <source src={url} type="video/mp4" />
        </video>
      )}
      {thumbnail && (
        <>
          <img src={thumbnail} alt={title} className={`position-absolute top-0 end-0 start-0 bottom-0 object-fit-cover`}/>
          <button type={`button`} className={`d-flex align-items-center justify-content-center`} onClick={playVideo}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20 40a20 20 0 1 0 0-40 20 20 0 0 0 0 40Zm7.5-20-11 7V13l11 7Z" fill="#fff"/>
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
