import React, {useState, useEffect} from "react";
import Button from "../Button";
import clsx from "clsx";

export const ShareButtons = ({className}) => {
  const [showTip, setShowTip] = useState(false);
  const [url, setUrl] = useState('#');

  useEffect(() => {
    if (window) {
      setUrl(window.location.origin + window.location.pathname);
    }
  }, []);

  const copyLink = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(url);
      setShowTip(true);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }

    setTimeout(() => {
      setShowTip(false);
    }, 1500)
  }

  return (
    <div className={clsx(className || `flex-column align-items-start d-flex gap-24`, )}>
      <div className="d-flex gap-10">
        <a
          className="link-base"
          href={`https://twitter.com/intent/tweet?url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Twitter"
        >

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="31" height="31" viewBox="0 0 50 50" fill="none">
            <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z" fill="currentColor"></path>
          </svg>
        </a>
        <a
          className="link-base"
          href={`https://www.facebook.com/sharer.php?&u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
              fill="currentColor"/>
          </svg>
        </a>
        <a
          className="link-base"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Linkedin"
        >

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.35 1H2.65C1.73 1 1 1.74 1 2.56v18.88c0 .82.73 1.56 1.65 1.56h18.7c.92 0 1.65-.74 1.65-1.56V2.56C23 1.74 22.27 1 21.35 1ZM7.51 19.78H4.3V9.28h3.2v10.5ZM5.95 7.8c-1 0-1.92-.83-1.92-1.93s.82-1.93 1.92-1.93c1 0 1.92.82 1.92 1.93 0 1.1-.91 1.93-1.92 1.93ZM19.79 19.7h-3.2v-5.16c0-1.2 0-2.85-1.75-2.85-1.74 0-1.92 1.38-1.92 2.67v5.24H9.7V9.3h3.02v1.38h.1a3.57 3.57 0 0 1 3.11-1.75c3.3 0 3.94 2.2 3.94 5.06v5.7h-.09Z"
              fill="currentColor"/>
          </svg>
        </a>
      </div>
      <Button size={`sm`}
              icon={`copy`}
              onClick={(e) => {
                copyLink(e);
              }}
      >
        Copy page link
        {showTip && (<span className={`position-absolute top-100 end-0 mt-6 text-body`}>Copied!</span>)}
      </Button>
    </div>
)
}
