import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Link from '/src/components/Link';
import Button from '/src/components/Button';

export default function NotFoundContent({className}) {
  const triggerSearch = (e) => {
    e.preventDefault();
    if (window) {
        document.querySelector('.DocSearch-Button').click();
    }
  }
  const LinksList = [
    {
      href: `/developers/quickstart/`,
      title: `Browse our quick starts and SDKs`
    },
    {
      href: `/`,
      title: `Head back to the Homepage`
    }
  ]
  return (
    <main className={clsx('pt-44 pt-lg-24', className)}>
      <div className="row">
        <div className="col-10 col-md-10 col-xl-9">
          <Heading as="h1" className="h0 mb-44 mb-md-64 position-relative w-fit pe-34">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
                Hey there, looks like you’ve hit a dead end!
              </Translate>
            <span className={`badge bg-primary position-absolute top-0 end-0 fs-md-20`}>
              404
            </span>
          </Heading>
        </div>
        <div className="col-12 col-md-10 offset-md-1 col-xl-5 offset-xl-1">
          <div className="d-flex flex-column gap-44">
            <div className="d-flex flex-column gap-24 align-items-start">
              <p className={`mb-0 subtitle-1 fs-md-28`}>
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page">
                  Don’t worry, it happens to the best of us. Here are some resources that might help you get back on track:
                </Translate>
              </p>
              <Button size={'lg'} className={`px-44`}
                      onClick={triggerSearch}
              >
                <Translate
                  id="theme.SearchBar.label"
                  >
                Search
                </Translate>
              </Button>
            </div>
            <div className="markdown">
              {LinksList?.length > 0 && (
                <ul className={`list-unstyled d-flex flex-column gap-4 p-0 mb-8`}>
                  {LinksList.map((item, index) => (
                    <li className={`d-flex gap-8 align-items-center`} key={index}>
                      <svg width="16" height="16" className={'text-primary'}>
                        <use xlinkHref="#icon-link-external"/>
                      </svg>
                      <Link href={item.href}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
              <p>Still can’t find what you’re looking for? Feel free to <Link href={`https://github.com/rsksmart/rsksmart.github.io/issues`}>submit an issue</Link> or request help on <Link href={`http://discord.gg/rootstock`}>discord.</Link></p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 offset-md-1 col-xl-4 offset-xl-1 mt-72 mt-md-64 mt-xl-0">
          <div className={`rounded-20 border p-24`}>
            <p className={`m-0 subtitle-2`}>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
                We're always working on improving our documentation, so if you can't find what you're looking for, let us know!
              </Translate>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
