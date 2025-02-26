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

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.54752 21.7508C16.6042 21.7508 21.5578 14.2474 21.5578 7.74052C21.5578 7.5274 21.5578 7.31524 21.5434 7.10404C22.507 6.407 23.3389 5.54392 24 4.55524C23.1014 4.95364 22.148 5.2148 21.1718 5.32996C22.1998 4.71465 22.9692 3.74674 23.3366 2.60644C22.3701 3.18005 21.3126 3.58427 20.2099 3.80164C19.4675 3.01222 18.4856 2.48948 17.4162 2.31432C16.3468 2.13917 15.2494 2.32135 14.294 2.83269C13.3385 3.34403 12.5782 4.15601 12.1307 5.14299C11.6833 6.12996 11.5735 7.23691 11.8186 8.29252C9.8609 8.19432 7.94576 7.68555 6.19745 6.79924C4.44915 5.91294 2.90676 4.6689 1.6704 3.14788C1.04073 4.23188 0.847872 5.51511 1.1311 6.7363C1.41433 7.9575 2.15234 9.02483 3.19488 9.721C2.41123 9.69804 1.64465 9.48663 0.96 9.10468V9.16708C0.960311 10.3039 1.35385 11.4057 2.07387 12.2854C2.79389 13.1652 3.79606 13.7689 4.9104 13.994C4.18548 14.1917 3.42487 14.2206 2.68704 14.0784C3.00181 15.0568 3.61443 15.9123 4.43924 16.5254C5.26405 17.1385 6.25983 17.4785 7.28736 17.498C6.26644 18.3004 5.09731 18.8938 3.84687 19.244C2.59643 19.5942 1.28921 19.6944 0 19.5389C2.25183 20.9839 4.87192 21.7504 7.54752 21.7469"
              fill="currentColor"/>
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
