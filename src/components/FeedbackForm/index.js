import React, {useState} from "react";
import Translate from '@docusaurus/Translate';

import { ModalFormSpark } from "/src/components/ModalFormSpark";

export const FeedbackForm = () => {

  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [totalStars, setTotalStars] = useState(5);
  const [hover, setHover] = useState(null);

  return (
    <div>
      <h4 className={`title-s mb-12 text-uppercase`}>
        <Translate
          id="theme.FeedbackForm.title">
          Feedback
        </Translate>
      </h4>
      <div className="d-flex">
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={index}
                   onMouseEnter={() => setHover(currentRating)}
                   onMouseLeave={() => setHover(null)}
            >
              <input
                className={`d-none`}
                key={star}
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setModalShow(true)}
                onChange={() => setRating(currentRating)}
              />
              <svg width="23" height="24" viewBox="0 0 23 24" fill="none">
                <path
                  d="M11.5 5.18625L13.4837 9.19688L13.8144 9.91563L14.5331 10.0234L18.9606 10.6631L15.8125 13.7538L15.2734 14.2784L15.4028 14.9972L16.1575 19.4031L12.1972 17.3259L11.5 17.0312L10.8315 17.3834L6.87123 19.4319L7.58998 15.0259L7.71936 14.3072L7.18748 13.7538L4.01061 10.6272L8.43811 9.9875L9.15686 9.87969L9.48748 9.16094L11.5 5.18625ZM11.5 1.9375L8.22967 8.56438L0.919983 9.62094L6.20998 14.7816L4.95936 22.0625L11.5 18.6269L18.0406 22.0625L16.79 14.7816L22.08 9.62812L14.7703 8.56438L11.5 1.9375Z"
                  fill="currentColor"/>
                <path d="M11.5 1.9375L8.22967 8.56438L0.919983 9.62094L6.20998 14.7816L4.95936 22.0625L11.5 18.6269L18.0406 22.0625L16.79 14.7816L22.08 9.62812L14.7703 8.56438L11.5 1.9375Z" fill={currentRating <= (hover) ? "currentColor" : "none"}/>
              </svg>
            </label>
          );
        })}
      </div>

      <ModalFormSpark
        show={modalShow}
        rating={rating}
        form={{id: 'vg6LeINWT', title: 'Thank you for your feedback!', description: 'We would love to hear your thoughts and feedback so that we can improve these Docs for you and others!', type: 'feedback'}}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
