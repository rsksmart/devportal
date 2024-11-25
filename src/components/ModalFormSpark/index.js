import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { FormFeedback } from './Forms/FormFeedback'
import { FormRequestArticle } from './Forms/FormRequestArticle'

export const ModalFormSpark = (props) => {

  const { form } = props;

  return form?.id && (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button onClick={props.onHide} className={`btn-blank d-flex position-absolute end-0 top-0 text-body z-1 ${!form.description && !form.title ? 'me-8 mt-8' : 'me-32 mt-32'}`}>
        <svg width="24" height="24">
          <use xlinkHref="#icon-close-circle"/>
        </svg>
      </button>
      <Modal.Body>
        {form?.title && (
          <Modal.Title as={'h4'} id="contained-modal-title-vcenter" className={'mb-16 subtitle-2 pe-32'}>
            {form.title}
          </Modal.Title>
        )}
        {form.description && (
          <p className={!form.title ? 'pe-32' : ''}>{form.description}</p>
        )}

        {(form?.type === 'feedback') && <FormFeedback form={form} rating={props.rating || null} onDismiss={props.onHide || null} />}
        {(form?.type === 'request-article') && <FormRequestArticle form={form} onDismiss={props.onHide || null} />}

      </Modal.Body>
    </Modal>
  );
}
