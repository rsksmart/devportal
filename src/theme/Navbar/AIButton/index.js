// import React, {useEffect, useState} from 'react';
// import {MendableFloatingButton} from "@mendable/search"
// import {useColorMode} from "@docusaurus/theme-common";
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// export default function AIButton() {
//   const {
//     siteConfig: {customFields},
//   } = useDocusaurusContext();
//   const {keys} = customFields;

//    const ANON_KEY = keys.mendable;const {colorMode} = useColorMode();
//   const [style, setStyle] = useState({darkMode: colorMode === 'dark', accentColor: colorMode === 'dark' ? "#fff" : '#000'})

//   const floatingButtonStyle = {
//     color: "var(--bs-body-color)",
//     backgroundColor: "var(--bs-body-bg)",
//   }
//  

//   const icon = (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//       <path
//         d="M14.707 12L5.99992 3.29295C5.80945 3.11109 5.55624 3.00961 5.29289 3.00961C5.02955 3.00961 4.77633 3.11109 4.58587 3.29295L3.29287 4.58595C3.10564 4.77362 3.00049 5.02789 3.00049 5.29298C3.00049 5.55807 3.10564 5.81234 3.29287 6L11.9994 14.7071C12.1871 14.8942 12.4414 14.9994 12.7064 14.9994C12.9715 14.9994 13.2258 14.8942 13.4135 14.7071L14.707 13.4138C14.7998 13.321 14.8735 13.2107 14.9238 13.0894C14.9741 12.9681 14.9999 12.8381 14.9999 12.7068C14.9999 12.5755 14.9741 12.4454 14.9238 12.3241C14.8735 12.2028 14.7998 12.0928 14.707 12ZM3.99992 5.29295L5.29287 4L7.79287 6.5L6.49957 7.79345L3.99957 5.29345L3.99992 5.29295Z"
//         fill="currentColor"/>
//       <path d="M1.99999 6.99999L1 7.99998L1.99999 8.99997L2.99998 7.99998L1.99999 6.99999Z" fill="currentColor"/>
//       <path d="M7.99999 1.00001L7 2L7.99999 2.99999L8.99998 2L7.99999 1.00001Z" fill="currentColor"/>
//       <path d="M1.99999 1.00001L1 2L1.99999 2.99999L2.99998 2L1.99999 1.00001Z" fill="currentColor"/>
//     </svg>
//   )

//   useEffect(() => {
//     setStyle({darkMode: colorMode === 'dark', accentColor: colorMode === 'dark' ? "#fff" : '#000'})
//   }, [colorMode]);

//   return (
//     <MendableFloatingButton
//       language={`en`}
//       showPopup={false}
//       popupText={``}
//       dismissPopupAfter={0}
//       cmdShortcutKey={'i'}
//       icon={icon}
//       botIcon={icon}
//       anon_key={ANON_KEY}
//       style={style}
//       floatingButtonStyle={floatingButtonStyle}
//       positionOverwriteClassname={`position-statick`}/>
//   );
// }
