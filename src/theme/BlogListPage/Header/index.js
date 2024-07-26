import React from 'react';
import TitleColor from "/src/components/TitleColor";

export default function BlogListPageHeader({data}) {
  const {blogDescription, blogTitle} = data;

  return (blogTitle || blogDescription) && (
    <div className="mb-24 mb-md-64">
      {blogTitle && (
        <TitleColor as={'h1'} size={'md'} color={'orange'} className={`mb-16 mb-md-24`}>
          {blogTitle}
        </TitleColor>
      )}
      {blogDescription && (
        <p className={`mb-0 h2`}>
          {blogDescription}
        </p>
      )}
    </div>
  )
}
