import React from 'react';

import NavbarSearch from "@theme/Navbar/Search";
import SearchBar from "@theme/SearchBar";
import {useThemeConfig} from "@docusaurus/theme-common";

export default function NavbarMobileSidebarSearch() {
  const items = useThemeConfig().navbar.items;
  const searchBarItem = items.find((item) => item.type === 'search');

  return (
      <div className={`d-flex align-items-center mb-24 gap-16`}>
        {!searchBarItem && (
          <NavbarSearch className={`flex-grow-1 d-flex flex-column`}>
            <SearchBar />
          </NavbarSearch>
        )}
      </div>
    )
}
