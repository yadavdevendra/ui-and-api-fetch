import { Page } from '@shopify/polaris';
import React from 'react';
import Heading from './Heading';
import MainTitle from './MainTitle';

function TitleComponents() {
  const count = [1,2,3,4,5]
  const maintitle =count.forEach(element => {
    
  })

  return (
    <Page>
      <Heading />
      <MainTitle />
      <MainTitle />
      <MainTitle />
      <MainTitle />
      <MainTitle />
      <MainTitle />
    </Page>
  );
}
export default TitleComponents;