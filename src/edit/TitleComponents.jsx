import { Badge, Button, Layout, Page, Text, TextContainer, TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import Titleofedit from "./page/Titleofedit";
import Descriptionofedit from "./page/Descriptionofedit";
import HandlingTime from "./page/HandlingTime";
import PriceOfEdit from "./page/PriceOfEdit";
import Quantityofedit from "./page/Quantityofedit";
import { useParams } from "react-router-dom";
import Barcodeofedit from "./page/Barcodeofedit";
import { payload, token } from '../data/Data'


function TitleComponents() {
  const [title, setTitle] = useState([]);
  const [save, setSave] = useState([
    {}, {}, {}, {}, {}, {}
  ])
  console.log(save, "save");

  const id = useParams([]);
  var result = Object.keys(id).map((key) => [id[key]]);
  useEffect(() => {
    // we can keep the token in env variable for more security
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProduct?target_marketplace=amazon&source_marketplace=shopify&sourceShopID=500&targetShopID=640&container_id=${result}`,
      {
        method: "GET",
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
      .then((allData) => {
        // console.log("Editapidata", allData);
        if (allData.data.rows[0].title) {
          setTitle(allData.data.rows[0].title);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("save",save);

  function handlesave() {

    const paylods = JSON.stringify(payload);
    // console.log("result", paylods);
    fetch(`https://multi-account.sellernext.com/home/public/connector/product/saveProduct`,
      {
        method: "POST",
        body: paylods,
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
      .then((allData) => { console.log("savedata", allData) })
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
              as your Offer or New ListisetSaveng and edit the details
              accordigly to know more checkout this guide on Amazo Listings
            </Text>
          </TextContainer>
        </Layout>
      </div>
      <Titleofedit title={title} save={save} setSave={setSave} />
      <Descriptionofedit title={title} save={save} setSave={setSave} />
      <HandlingTime title={title} save={save} setSave={setSave} />
      <PriceOfEdit title={title} save={save} setSave={setSave} />
      <Barcodeofedit title={title} save={save} setSave={setSave} />
      <Quantityofedit title={title} save={save} setSave={setSave} />
    </Page>
  );
}
export default TitleComponents;