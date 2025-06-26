import React from 'react';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import RightNavbarItems from "@theme/Navbar/MobileSidebar/RightNavbarItems";
import LocaleDropdown from "@theme/Navbar/LocaleDropdown";

export default function NavbarMobileSidebarFooter() {
  return (
    <div className="d-flex justify-content-between gap-12">
      <RightNavbarItems />
      <div className="d-flex gap-16 align-items-center">
        <NavbarColorModeToggle />
        <div className="locale-mobile">
          <LocaleDropdown  />
        </div>
      </div>
    </div>
  );
}
