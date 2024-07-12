import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Carousel from '/src/components/Carousel';
import Card from '/src/components/Card';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from 'react-bootstrap/Accordion';
import Quote from "/src/components/Quote";
import Video from "/src/components/Video";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Carousel, Tabs, TabItem, Accordion, Card, Quote, Video
};
