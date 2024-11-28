import React, {useState} from "react";
import Translate from '@docusaurus/Translate';

import { ModalFormSpark } from "/src/components/ModalFormSpark";
import IconArticle from "@theme/Icon/Article";

export const RequestArticle = ({label, form}) => {

  const [modalShow, setModalShow] = useState(false);

  return label && form?.id && (
    <>
      <button className={`btn-blank link-base d-inline-flex gap-8 align-items-center`}
              onClick={() => setModalShow(true)}
              type="button"
      >
        <IconArticle/>
        <Translate
          id="theme.moreLinks.requestArticle"
        >
          {label}
        </Translate>
      </button>

      <ModalFormSpark
        show={modalShow}
        form={{...form, type : "request-article"}}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
