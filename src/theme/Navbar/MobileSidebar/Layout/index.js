import React from 'react';

export default function NavbarMobileSidebarLayout({
  header,
  footer,
  search,
  primaryMenu,
  secondaryMenu,
}) {

  return (
    <div className="navbar-sidebar">
      <div className="container d-flex flex-column align-items-stretch h-100 pb-24">
        {header}
        {search}
        {primaryMenu}
        <div className="flex-grow-1 overflow-y-auto overflow-x-hidden">
          {secondaryMenu}
        </div>
        <div className="pt-32">
          {footer}
        </div>
      </div>
    </div>
  );
}
