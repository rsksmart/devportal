import React, { useEffect, useState } from 'react'
import { useFormspark } from '@formspark/use-formspark'

export const FormRequestArticle = (props) => {
  const { form } = props

  const [submit, submitting] = useFormspark({
    formId: form?.id || ``,
  })

  const requestTypes = ['Tutorial', 'Guide', 'Video', 'Image']

  const initFormData = {
    requestType: requestTypes[0],
    title: '',
    publicationLocation: '',
    why: '',
    otherInformation: '',
  }

  const [formData, setFormData] = useState(initFormData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (window) {
      const url = window.location.origin + window.location.pathname;

      setFormData((prevFormData) => ({
        ...prevFormData,
        url: url,
      }))
    }
  }, [])

  const onSubmit = async (e) => {
    if (submitting) return

    e.preventDefault()
    setSending(true)

    await submit(formData)
    setSubmitted(true);
    setSending(false);
    setFormData(initFormData);

    setTimeout(() => {
      setSubmitted(false)
    }, 4000)
  }

  return form?.id && (
    <form onSubmit={onSubmit}>
      <div className="d-flex flex-column gap-12 mb-24">
      {requestTypes.length > 0 && (
        <div>
          {requestTypes.map((value, index) => (
            <label className="form-check form-check-inline" key={index}>
              <input className="form-check-input" type="radio" name="requestType" checked={formData.requestType === value} value={value} onChange={handleInputChange}/>
              <span className="form-check-label">{value}</span>
            </label>
          ))}
        </div>
      )}
        <input type="text" className="form-control" name={`title`} required={true} placeholder={`Title`} maxLength={100}
               value={formData.title} onChange={handleInputChange}
        />
        <textarea className="form-control" name="why" placeholder={`Why / Reason for Request`} required={true} rows={3} maxLength={500}
                  value={formData.why} onChange={handleInputChange}
        />
        <input type="text" className="form-control" name={`publicationLocation`} required={false} placeholder={`Publication location (E.g, DevPortal, Blog)`} maxLength={100}
               value={formData.publicationLocation} onChange={handleInputChange}
        />
        <textarea className="form-control" name="otherInformation" placeholder={`Any other information`} required={false} rows={3} maxLength={500}
                  value={formData.otherInformation} onChange={handleInputChange}
        />
        <div className="markdown mt-4">
          <p className="mb-4 fw-bold">Are you a technical contributor?</p>
          <p><a href="https://github.com/rsksmart/devportal" target="_blank" rel="noreferrer">Submit a Pull Request</a> or an Issue</p>
        </div>
      </div>

      <div className={`d-flex justify-content-between align-items-center`}>
        <button type={`button`} className={`btn-blank`} onClick={props.onDismiss}>
          {!submitted ? (`Not now`) : (`Close`)}
        </button>

        <button
          className="btn position-relative py-10"
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
  )
}
