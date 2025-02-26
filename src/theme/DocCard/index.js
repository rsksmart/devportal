import React from 'react';
import clsx from 'clsx';
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/theme-common/internal';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import Button from "../../components/Button";

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description:
            'The default description for a category card in the generated index about how many items this category includes',
        },
        {count},
      ),
    );
}
function CardContainer({children}) {
  return (
    <div
      className={clsx('border position-relative d-flex flex-column align-items-start rounded-20 px-16 py-24 p-lg-32 h-100')}>
      {children}
    </div>
  );
}
function CardLayout({href, icon, title, description}) {
  return (
    <CardContainer>
      <h3 className={`h2 m-0 mb-12 mb-md-18`}>
        {title}
      </h3>

      {description && (
        <div className={`markdown fs-16 flex-grow-1`}>
          <p
            title={description}>
            {description}
          </p>
        </div>
      )}

      {href && (
        <Button href={href} stretched={true} className={`mt-24 py-6 px-20`} ariaLabel={title}>
          <svg width="16" height="16">
            <use xlinkHref="#icon-arrow-r"></use>
          </svg>
        </Button>
      )}
    </CardContainer>
  );
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}
function CardLink({item}) {
  const icon = isInternalUrl(item.href) ? '📄️' : '🔗';
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}
export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
