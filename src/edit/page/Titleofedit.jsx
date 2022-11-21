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
function Titleofedit({ title, setSave, save ,index=0}) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");

    function handleChoiceListChange(value) {
        console.log(value, "value");
        setSelected(value);
      save.map((item,i) => {
            if (index === i) {
                return { ...item, title: value }
            }
            return item
        })

        // console.log("selected", selected);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
        // console.log("textFieldValue", textFieldValue);
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
    useEffect(() => {
        console.log("selected", selected);
        if (title) {
            setSelected("Set the same Product title for Shopify and Amazon")


        } else {
            setSelected('')
        }
        const titlenewdata = save.map((item,i) => {
            if (index === i) {
                return { ...item, title: "Set the same Product title for Shopify and Amazon" }
            }
            return item
        })
        setSave(titlenewdata)
    }, [])
    // console.log("tityle",title);
    return (
        <Page fullWidth
        >
            <Layout>
                <Layout.Section oneThird>
                    <div style={{ marginTop: "var(--p-space-5)" }}>
                        <TextContainer>
                            <Text id="storeDetails" variant="headingMd" as="h4">
                                Variant Title
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
                                    label: "Set the same Product title for Shopify and Amazon",
                                    value: "Set the same Product title for Shopify and Amazon",
                                },
                                {
                                    label: "Set a Custom Product Title for Amazon",
                                    value1: "Set a Custom Product Title for Amazon",
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
export default Titleofedit;