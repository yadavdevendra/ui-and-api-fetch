import {Page,Layout,Card,TextContainer,Text,TextField,ChoiceList,} from '@shopify/polaris';
import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function MainTitle() {
    const [selected, setSelected] = useState(['none']);
    const [textFieldValue, setTextFieldValue] = useState('');
    const id = useParams([])
    var result = Object.keys(id).map((key) => [id[key]]);
    const handleChoiceListChange = useCallback((value) => setSelected(value), []);
  
    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );

    const renderChildren = useCallback(
      () => (
        <TextField placeholder='type text here'
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
      [handleTextFieldChange, textFieldValue],
    );

    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw`;
    useEffect(() => {
        // we can keep the token in env variable for more security
        fetch(
            `https://multi-account.sellernext.com/home/public/connector/product/getProduct?target_marketplace=amazon&source_marketplace=shopify&sourceShopID=500&targetShopID=640&container_id=${7939240558825}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Ced-Source-Id": 500,
                    "Ced-Source-Name": "shopify",
                    "Ced-Target-Id": 640,
                    "Ced-Target-Name": "amazon",
                    "appCode": "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
                    "appTag": "amazon_sales_channel"
                },
            }
        )
            .then((response) => response.json())
            .then((allData) => {
                console.log("allData",allData);
            })
            .catch((err) => console.log(err));
    },[]);


    return (
        <Page fullWidth>
            <Layout>
                <Layout.Section oneThird>
                    <div style={{ marginTop: 'var(--p-space-5)' }}>
                        <TextContainer>
                            <Text id="storeDetails" variant="headingMd" as="h4">
                                Store details
                            </Text>
                            <Text variant="bodyMd" color="subdued" as="p">
                                Shopify and your customers will use this information to contact
                                you.
                            </Text>
                        </TextContainer>
                    </div>
                </Layout.Section>
                <Layout.Section>
                    <Card sectioned>
                    <ChoiceList
                    choices={[
                      {label: 'Set the same Product title for Shopify and Amazon', value: 'minimum_purchase'},
                      {
                        label: 'Set a Custom Product Title for Amazon',value: 'minimum_quantity',
                        renderChildren,
                      },
                    ]}
                    selected={selected}
                    onChange={handleChoiceListChange}
                  />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
export default MainTitle;