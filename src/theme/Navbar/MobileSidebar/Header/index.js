import React from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';
function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close d-flex"
      onClick={() => mobileSidebar.toggle()}>
      <IconClose />
    </button>
  );
}
export default function NavbarMobileSidebarHeader() {
  return (
    <div className="navbar__inner mb-12">
      <NavbarLogo />
      <CloseButton />
    </div>
  );
}
