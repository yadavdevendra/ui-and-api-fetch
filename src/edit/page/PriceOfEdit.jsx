import {
    Page,
    Layout,
    Card,
    TextContainer,
    Text,
    TextField,
    ChoiceList,
} from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function PriceOfEdit({title}) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");

    function handleChoiceListChange(value) {
        setSelected(value);
        console.log("selected", selected);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
        console.log("textFieldValue", textFieldValue);
    }

    const renderChildren = useCallback(
        (isSelected) =>
            isSelected && (
                <TextField
                    label="Minimum Quantity"
                    labelHidden
                    onChange={handleTextFieldChange}
                    value={textFieldValue}
                    autoComplete="off"
                />
            ),
        [handleTextFieldChange, textFieldValue]
    );
    useEffect(()=>{
        if(title){
            setSelected("Set the same Price for Shopify and Amazon")
        }else{
            setSelected('')
        }
            },[])

    return (
        <Page fullWidth
        >
            <Layout>
                <Layout.Section oneThird>
                    <div style={{ marginTop: "var(--p-space-5)" }}>
                        <TextContainer>
                            <Text id="storeDetails" variant="headingMd" as="h4">
                            Price
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
                                {
                                    label: "Set the same Price for Shopify and Amazon",
                                    value: "Set the same Price for Shopify and Amazon",
                                },
                                {
                                    label: "Set a Custom Price for Amazon",
                                    value: "Set a Custom Price for Amazon",
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
export default PriceOfEdit;