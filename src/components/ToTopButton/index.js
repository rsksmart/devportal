import React from 'react'
import Button from '../Button'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate';

export const ToTopButton = ({ className }) => {

  return (
    <Button
      className={clsx(className)}
      size={`sm`}
      icon={`arrow-top`}
      onClick={() => {
        if (window) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
    >
      <Translate
        id="theme.common.backToTop">
        Back to top
      </Translate>
    </Button>
  )
}
