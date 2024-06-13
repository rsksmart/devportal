import React, {useState, useEffect} from "react";
import Translate from '@docusaurus/Translate';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.scss';
import { useFormspark } from "@formspark/use-formspark";

function MyVerticallyCenteredModal(props) {
  const [submit, submitting] = useFormspark({
    formId: `vg6LeINWT`,
  });

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [showMsg, setShowMsg] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit(
      { message, email, name }
    );
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 3000)
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
          <use xlinkHref="#icon-close-circle" />
        </svg>
      </button>
      <Modal.Body>
        <Modal.Title as={'h4'} id="contained-modal-title-vcenter" className={'mb-16 subtitle-2'}>
          Thank you for your feedback!
        </Modal.Title>
        <p>We would love to hear your thoughts and feedback so that we can improve these Docs for you and others!</p>
        <form onSubmit={onSubmit} >
          <div className="d-flex flex-column gap-12 mb-24">
            <input type="text" className="form-control" name={`name`} required={true} placeholder={`Name`}
                   value={name} onChange={(e) => setName(e.target.value)}
            />
            <input type="email" className="form-control" name={`email`} required={true} placeholder={`Email`}
                   value={email} onChange={(e) => setEmail(e.target.value)}
            />

            <textarea required={true} value={message} placeholder={`Message`} className="form-control" rows={4}
                      onChange={(e) => setMessage(e.target.value)} />
          </div>

          {showMsg && (
            <div className={`mb-12 text-success`}>
              Form submitted
            </div>
          )}

          <div className={`d-flex justify-content-between align-items-center`}>
            <button type={`button`} className={`btn-blank`} onClick={props.onHide}>Not now</button>

            <button
              className="btn-outline btn position-relative py-10"
              type="submit" disabled={submitting}
            >
            <span>
              Submit
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

  useEffect(() => {

  }, []);

  return (
    <div className={styles.wrap}>
      <h4 className={`title-s mb-12 text-uppercase`}>
        <Translate
          id="theme.FeedbackForm.title">
          Give us feedback
        </Translate>
      </h4>

      <button type={`button`} onClick={() => setModalShow(true)} className="d-flex btn-blank">
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4999 4.68625L13.4837 8.69688L13.8143 9.41563L14.533 9.52344L18.9605 10.1631L15.8124 13.2538L15.2734 13.7784L15.4027 14.4972L16.1574 18.9031L12.1971 16.8259L11.4999 16.5312L10.8315 16.8834L6.87117 18.9319L7.58992 14.5259L7.7193 13.8072L7.18742 13.2538L4.01055 10.1272L8.43805 9.4875L9.1568 9.37969L9.48742 8.66094L11.4999 4.68625ZM11.4999 1.4375L8.22961 8.06438L0.919922 9.12094L6.20992 14.2816L4.9593 21.5625L11.4999 18.1269L18.0405 21.5625L16.7899 14.2816L22.0799 9.12812L14.7702 8.06438L11.4999 1.4375Z"
            fill="currentColor"/>
        </svg>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4999 4.68625L13.4837 8.69688L13.8143 9.41563L14.533 9.52344L18.9605 10.1631L15.8124 13.2538L15.2734 13.7784L15.4027 14.4972L16.1574 18.9031L12.1971 16.8259L11.4999 16.5312L10.8315 16.8834L6.87117 18.9319L7.58992 14.5259L7.7193 13.8072L7.18742 13.2538L4.01055 10.1272L8.43805 9.4875L9.1568 9.37969L9.48742 8.66094L11.4999 4.68625ZM11.4999 1.4375L8.22961 8.06438L0.919922 9.12094L6.20992 14.2816L4.9593 21.5625L11.4999 18.1269L18.0405 21.5625L16.7899 14.2816L22.0799 9.12812L14.7702 8.06438L11.4999 1.4375Z"
            fill="currentColor"/>
        </svg>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4999 4.68625L13.4837 8.69688L13.8143 9.41563L14.533 9.52344L18.9605 10.1631L15.8124 13.2538L15.2734 13.7784L15.4027 14.4972L16.1574 18.9031L12.1971 16.8259L11.4999 16.5312L10.8315 16.8834L6.87117 18.9319L7.58992 14.5259L7.7193 13.8072L7.18742 13.2538L4.01055 10.1272L8.43805 9.4875L9.1568 9.37969L9.48742 8.66094L11.4999 4.68625ZM11.4999 1.4375L8.22961 8.06438L0.919922 9.12094L6.20992 14.2816L4.9593 21.5625L11.4999 18.1269L18.0405 21.5625L16.7899 14.2816L22.0799 9.12812L14.7702 8.06438L11.4999 1.4375Z"
            fill="currentColor"/>
        </svg>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4999 4.68625L13.4837 8.69688L13.8143 9.41563L14.533 9.52344L18.9605 10.1631L15.8124 13.2538L15.2734 13.7784L15.4027 14.4972L16.1574 18.9031L12.1971 16.8259L11.4999 16.5312L10.8315 16.8834L6.87117 18.9319L7.58992 14.5259L7.7193 13.8072L7.18742 13.2538L4.01055 10.1272L8.43805 9.4875L9.1568 9.37969L9.48742 8.66094L11.4999 4.68625ZM11.4999 1.4375L8.22961 8.06438L0.919922 9.12094L6.20992 14.2816L4.9593 21.5625L11.4999 18.1269L18.0405 21.5625L16.7899 14.2816L22.0799 9.12812L14.7702 8.06438L11.4999 1.4375Z"
            fill="currentColor"/>
        </svg>
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4999 4.68625L13.4837 8.69688L13.8143 9.41563L14.533 9.52344L18.9605 10.1631L15.8124 13.2538L15.2734 13.7784L15.4027 14.4972L16.1574 18.9031L12.1971 16.8259L11.4999 16.5312L10.8315 16.8834L6.87117 18.9319L7.58992 14.5259L7.7193 13.8072L7.18742 13.2538L4.01055 10.1272L8.43805 9.4875L9.1568 9.37969L9.48742 8.66094L11.4999 4.68625ZM11.4999 1.4375L8.22961 8.06438L0.919922 9.12094L6.20992 14.2816L4.9593 21.5625L11.4999 18.1269L18.0405 21.5625L16.7899 14.2816L22.0799 9.12812L14.7702 8.06438L11.4999 1.4375Z"
            fill="currentColor"/>
        </svg>
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
