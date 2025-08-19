import React from 'react';
import TitleColor from "/src/components/TitleColor";

export default function ChangelogHeader({data}) {
  const {description, title} = data || {};

  return (title || description) && (
    <div className="mb-24 mb-md-64">
      {title && (
        <TitleColor as={'h1'} size={'md'} color={'orange'} className={`mb-16 mb-md-24`}>
          {title}
        </TitleColor>
      )}
      {description && (
        <p className={`mb-0 h2`}>
          {description}
        </p>
      )}
    </div>
  )
}
