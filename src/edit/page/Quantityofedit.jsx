import {
    Page,
    Layout,
    Card,
    TextContainer,
    Text,
    TextField,
    ChoiceList,
    Form,
} from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function Quantityofedit({ data, setSave, save }) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");


    function handleSubmit(e) {
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, quantity: 1 } }
        })
    }
    const renderChildren = useCallback(
        (isSelected) =>
            isSelected && (
                <Form onSubmit={handleSubmit}>
                    <TextField
                        label="Minimum Quantity"
                        labelHidden
                        onChange={handleTextFieldChange}
                        value={textFieldValue}
                        autoComplete="off"
                    />
                </Form>
            ),
        [handleTextFieldChange, textFieldValue]
    );
    const options = [
        {
            label: "Set the same Product Quantity for Shopify and Amazon",
            value: data?.quantity,
        },
        {
            label: "Set a Custom Product Quantity for Amazon",
            value: "custom",
            renderChildren,
        },
    ]
    function handleChoiceListChange(value) {
        setSelected(value);
        const { unset, ...keep } = save
        setSave(keep)
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
    }
    useEffect(() => {
        if (data)setTextFieldValue(data?.quantity||options[1].value)
        if (data !== undefined) {
            console.log("data", data);
            if (data.edited == false) {
                setSelected([options[0].value])
                setSave((prevSave) => {
                    return { ...prevSave, quantity: options[0].value }
                })
            } else {
                setSelected([options[1].value])
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
                                Quantity
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
export default Quantityofedit;