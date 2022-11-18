import { Page, Badge, Card, Layout, TextContainer, Text } from '@shopify/polaris';
import React from 'react';

function Heading() {
  return (
    <Page
      breadcrumbs={[{ content: 'Products', url: '/listing' }]}
      title="S/Orange"
      titleMetadata={<Badge status="success">Active</Badge>}
      subtitle="Perfect"
      compactTitle
      primaryAction={{ content: 'Save' }}
    >
        <div style={{ marginTop: 'var(--p-space-5)' }}>
        <Layout>
          <TextContainer>
            <Text id="storeDetails" variant="headingMd" as="h5">
              Store details
            </Text>
            <Text variant="bodyMd" color="subdued" as="p">
              Choose Whether you want to list your product as your Offer or New Listing and edit the details accordigly to know more checkout this guide on Amazo Listings
            </Text>
          </TextContainer>
          </Layout>
        </div>
   
    </Page>
  );
}


export default Heading;