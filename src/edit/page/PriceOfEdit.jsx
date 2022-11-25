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

function PriceOfEdit({ data, setSave, save }) {
    // console.log("dataedit", data);
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");
    function handleSubmit(e) {
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, price: 1 } }
        })
    }
    const renderChildren = useCallback(
        (isSelected) =>
            isSelected && (
                <Form onSubmit={handleSubmit}>
                    <TextField
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
            label: "Set the same Product price for Shopify and Amazon",
            value: "default",
        },
        {
            label: "Set a Custom Product price for Amazon",
            value: "custom",
            renderChildren,
        },
    ]


    function handleChoiceListChange(value) {
        setSelected(value);
        setTextFieldValue(data?.edited?.price || data?.price)
        const { unset, ...keep } = save
        setSave({ ...keep, price: data?.edited?.price || data?.price })

    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
    }
    useEffect(() => {
        if (data)
            setTextFieldValue(data?.edited?.price || data?.price)
        if (data !== undefined) {
            if (data?.edited?.price) {
                setSelected(["custom"])
                setSave((prevSave) => {
                    return { ...prevSave, price: data?.edited?.price || data?.price}
                })
            } else {
                setSelected(["default"])
                setSave((prevSave) => {
                    return { ...prevSave, price: data?.edited?.price || data?.price}
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
export default PriceOfEdit;