import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import {
  useBlogPost,
  useDateTimeFormat,
} from '@docusaurus/theme-common/internal';
// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}
function ReadingTime({readingTime}) {
  const readingTimePlural = useReadingTimePlural();
  return <span className={`badge bg-orange text-uppercase`}>{readingTimePlural(readingTime)}</span>;
}
function DateTime({date, formattedDate}) {
  return <time className={`badge bg-orange text-uppercase`} dateTime={date}>{formattedDate}</time>;
}
export default function BlogPostItemHeaderInfo({className}) {
  const {metadata} = useBlogPost();
  const {date, readingTime, authors} = metadata;

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formatDate = (blogDate) => dateTimeFormat.format(new Date(blogDate));
  return (
    <div className={clsx('d-flex flex-wrap gap-12 mb-24', className)}>
      {authors.length == 1 && (
        <span className={`badge bg-orange text-uppercase`}>{authors[0].name}</span>
      )}
      <DateTime date={date} formattedDate={formatDate(date)} />
      {typeof readingTime !== 'undefined' && (
        <ReadingTime readingTime={readingTime} />
      )}
    </div>
  );
}
