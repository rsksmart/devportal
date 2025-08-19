import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Button from "/src/components/Button";

function ReadMoreLabel() {
  return (
    <Translate
      id="theme.blog.post.readMore"
      description="The label used in blog post item excerpts to link to full blog posts">
      Read More
    </Translate>
  );
}
export default function ReadMoreLink(props) {
  const {title, ...linkProps} = props;
  return (
    <Button
      size={'sm'}
      className={`px-12`}
      href={props.to}
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        {title: title},
      )}
      {...linkProps}>
      <ReadMoreLabel />
      <svg width={12} height={12}>
        <use xlinkHref="#icon-arrow-r" />
      </svg>
    </Button>
  );
}
