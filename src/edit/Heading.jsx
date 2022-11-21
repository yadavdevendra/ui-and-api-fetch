import { Page, Badge, Layout, TextContainer, Text, Button } from '@shopify/polaris';
import React from 'react';
import { payload, token } from '../data/Data'
console.log(payload, "payload");

function Heading() {
  const result = JSON.stringify(payload);
  console.log("result", result);
  function handlesave() {
    fetch(`https://multi-account.sellernext.com/home/public/connector/product/saveProduct`,
      {
        method: "POST",
        body: result,
        headers: {
          Authorization: `Bearer ${token}`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 640,
          "Ced-Target-Name": "amazon",
          appCode:
            "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
          appTag: "amazon_sales_channel",
        },
      }
    )
      .then((response) => response.json())
      .then((allData) => { console.log(allData) })
  }

  return (
    <Page
      breadcrumbs={[{ content: 'Products', url: '/listing' }]}
      title="S/Orange"
      titleMetadata={<Badge status="success">Active</Badge>}
      subtitle="Perfect"
      compactTitle
      primaryAction={<Button onClick={handlesave}>Save</Button>}
    >
      <div style={{ marginTop: 'var(--p-space-5)' }}>
        <Layout>
          <TextContainer>
            <Text id="storeDetails" variant="headingMd" as="h5">
              Store details
            </Text>
            <Text variant="bodyMd" color="subdued" as="p">
              Choose Whether you want to list your product
              as your Offer or New Listing and edit the details
              accordigly to know more checkout this guide on Amazo Listings
            </Text>
          </TextContainer>
        </Layout>
      </div>

    </Page>
  );
}


export default Heading;