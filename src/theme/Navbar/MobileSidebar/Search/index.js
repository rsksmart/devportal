import React from 'react';

import NavbarSearch from "@theme/Navbar/Search";
import SearchBar from "@theme/SearchBar";
import {useThemeConfig} from "@docusaurus/theme-common";

export default function NavbarMobileSidebarSearch() {
  const items = useThemeConfig().navbar.items;
  const searchBarItem = items.find((item) => item.type === 'search');

  return !searchBarItem && (
    <NavbarSearch className={`mb-24`}>
      <SearchBar />
    </NavbarSearch>
  );
}
