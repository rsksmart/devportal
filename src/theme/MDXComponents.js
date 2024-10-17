import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Carousel from '/src/components/Carousel';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Accordion from 'react-bootstrap/Accordion';
import Quote from "/src/components/Quote";
import Video from "/src/components/Video";
import Card from "/src/components/CardSimple";
import Filter from "/src/components/Filter";
import FilterItem from "/src/components/Filter/FilterItem";
import Button from "/src/components/Button";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Carousel, Tabs, TabItem, Accordion, Card, Quote, Video, Filter, FilterItem, Button
};
