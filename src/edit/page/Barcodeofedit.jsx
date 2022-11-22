import { Page, Layout, Card, TextContainer, Text, TextField, ChoiceList, } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function Barcodeofedit({ data, setSave, save }) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");

    function handleChoiceListChange(value) {
        setSelected(value);
        console.log("selected", selected);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
        setSave((prevSave) => {
            return { ...prevSave, unset: {...prevSave.unset, custom_text:value} }
        })
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
    const options = [
        {
            label: "Set the same Product Barcode for Shopify and Amazon",
            value: data?.barcode,
        },
        {
            label: "Set a Custom Product Barcode for Amazon",
            value: "custom",
            renderChildren,
        },
    ]

    useEffect(() => {
        if (data !== undefined ) {
            if (data.barcode!=="") {
                setSelected(options[0].value)
                setSave((prevSave) => {
                    return { ...prevSave, barcode: options[0].value }
                })
            } else {
                setSelected([options[1].value])
                setSave((prevSave) => {
                    return { ...prevSave, unset: {...prevSave.unset, barcode: options[1].value} }
                })
            }
        }
    }, [data])

    return (
        <Page fullWidth
        >
            <Layout>
                <Layout.Section oneThird>
                    <div style={{ marginTop: "var(--p-space-5)" }}>
                        <TextContainer>
                            <Text id="storeDetails" variant="headingMd" as="h4">
                                Barcode
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
                        <ChoiceList disabled
                            choices={options}
                            selected={selected}
                            onChange={handleChoiceListChange}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
export default Barcodeofedit;