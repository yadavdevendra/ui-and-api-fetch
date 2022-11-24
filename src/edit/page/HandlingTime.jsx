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

function HandlingTime({ data, setSave, save }) {
    // console.log("dataedit", data);
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");
    function handleSubmit(e) {
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, inventory_fulfillment_latency: 1 } }
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
            label: "Set the same Product inventory_fulfillment_latency for Shopify and Amazon",
            value: "default",
        },
        {
            label: "Set a Custom Product inventory_fulfillment_latency for Amazon",
            value: "custom",
            renderChildren,
        },
    ]


    function handleChoiceListChange(value) {
        setSelected(value);
        setTextFieldValue(data?.edited?.inventory_fulfillment_latency || data?.inventory_fulfillment_latency)
        const { unset, ...keep } = save
        setSave({ ...keep, inventory_fulfillment_latency: data.inventory_fulfillment_latency })

    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
    }
    useEffect(() => {
        if (data)
            setTextFieldValue(data?.inventory_fulfillment_latency)
        if (data !== undefined) {
            if (data?.edited?.inventory_fulfillment_latency) {
                setSelected(["default"])
                setSave((prevSave) => {
                    return { ...prevSave, inventory_fulfillment_latency: data?.edited?.inventory_fulfillment_latency || data?.inventory_fulfillment_latency}
                })
            } else {
                setSelected(["custom"])
                setSave((prevSave) => {
                    return { ...prevSave, inventory_fulfillment_latency: data?.edited?.inventory_fulfillment_latency || data?.inventory_fulfillment_latency}
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
                                Handling Time
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
export default HandlingTime;