import React, {useState, useEffect} from "react";
import Translate from '@docusaurus/Translate';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.scss';
import {useFormspark} from "@formspark/use-formspark";

function MyVerticallyCenteredModal(props) {
  const [submit, submitting] = useFormspark({
    formId: `vg6LeINWT`,
  });

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalStars = 5;
  const [rating, setRating] = useState(props.rating || 0);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(props.rating);
  }, [props.rating, props.show]);

  const onSubmit = async (e) => {
    if (submitting) return;

    e.preventDefault();
    setSending(true);
    await submit(
      {message, email, name, rating}
    );
    setSubmitted(true);
    setSending(false);
    setMessage("");
    setEmail("");
    setName("");
    setRating(0);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000)
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button onClick={props.onHide} className={'btn-blank d-flex position-absolute end-0 top-0 text-body me-32 mt-32 z-1'}>
        <svg width="24" height="24">
          <use xlinkHref="#icon-close-circle"/>
        </svg>
      </button>
      <Modal.Body>
        <Modal.Title as={'h4'} id="contained-modal-title-vcenter" className={'mb-16 subtitle-2'}>
          Thank you for your feedback!
        </Modal.Title>
        <p>We would love to hear your thoughts and feedback so that we can improve these Docs for you and others!</p>
        <div className="my-32 d-flex gap-12 justify-content-between align-items-center">
          <span>Current rating</span>
          <div className={'d-flex gap-8'}>
            {[...Array(totalStars)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={index}
                       onMouseEnter={() => setHover(currentRating)}
                       onMouseLeave={() => setHover(null)}
                >
                  <input
                    disabled={submitting}
                    className={`d-none`}
                    key={star}
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                  />
                  <svg width="23" height="24" viewBox="0 0 23 24" fill="none">
                    <path
                      d="M11.5 5.18625L13.4837 9.19688L13.8144 9.91563L14.5331 10.0234L18.9606 10.6631L15.8125 13.7538L15.2734 14.2784L15.4028 14.9972L16.1575 19.4031L12.1972 17.3259L11.5 17.0312L10.8315 17.3834L6.87123 19.4319L7.58998 15.0259L7.71936 14.3072L7.18748 13.7538L4.01061 10.6272L8.43811 9.9875L9.15686 9.87969L9.48748 9.16094L11.5 5.18625ZM11.5 1.9375L8.22967 8.56438L0.919983 9.62094L6.20998 14.7816L4.95936 22.0625L11.5 18.6269L18.0406 22.0625L16.79 14.7816L22.08 9.62812L14.7703 8.56438L11.5 1.9375Z"
                      fill="currentColor"/>
                    <path d="M11.5 1.9375L8.22967 8.56438L0.919983 9.62094L6.20998 14.7816L4.95936 22.0625L11.5 18.6269L18.0406 22.0625L16.79 14.7816L22.08 9.62812L14.7703 8.56438L11.5 1.9375Z" fill={currentRating <= (hover || rating) ? "currentColor" : "none"}/>
                  </svg>
                </label>
              );
            })}
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="d-flex flex-column gap-12 mb-24">
            <input type="hidden" name="rating" value={rating}/>
            <input type="text" className="form-control" name={`name`} required={true} placeholder={`Name`}
                   value={name} onChange={(e) => setName(e.target.value)}
            />
            <input type="email" className="form-control" name={`email`} required={true} placeholder={`Email`}
                   value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <textarea required={true} value={message} placeholder={`Message`} className="form-control" rows={4}
                      onChange={(e) => setMessage(e.target.value)}/>
          </div>

          <div className={`d-flex justify-content-between align-items-center`}>
            <button type={`button`} className={`btn-blank`} onClick={props.onHide}>
              {!submitted ? (`Not now`) : (`Close`)}
            </button>

            <button
              className="btn-outline btn position-relative py-10"
              type="submit" disabled={submitting}
            >
              <span>
                {sending && (
                  <>
                    Submitting
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </>
                )}
                {!sending && !submitted && (
                  <>
                    Submit
                    <svg width="16" height="17">
                      <use xlinkHref="#icon-arrow-right"/>
                    </svg>
                  </>
                )}
                {!sending && submitted && (
                  <>
                    Submitted
                    <svg width="16" height="17">
                      <use xlinkHref="#icon-check-circle"/>
                    </svg>
                  </>
                )}
              </span>
            </button>

          </div>
        </form>


      </Modal.Body>
    </Modal>
  );
}

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
          Give us feedback
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

      <MyVerticallyCenteredModal
        show={modalShow}
        rating={rating}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
