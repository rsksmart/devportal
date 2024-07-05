import React from 'react';

import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import ReadingTime from "@theme/DocItem/ReadingTime";

export default function DocItemHeaderDesktop() {

  return (
    <div className="d-none d-lg-flex gap-24 justify-content-between align-items-start mb-24">
      <DocBreadcrumbs/>
      <ReadingTime/>
    </div>
  )
}
