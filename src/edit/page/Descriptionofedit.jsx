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

function Descriptionofedit({data, setSave, save }) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");
    function handleSubmit(e){
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, description: Number(prevSave.unset.description) + 1 } }
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
    const options=[
        {
            label: "Set the same Product Description for Shopify and Amazon",
            value: data?.description
        },
        {
            label: "Set a Custom Product Description for Amazon",
            value: "Custom",
            renderChildren,
        },
    ]

    function handleChoiceListChange(value) {
        setSelected(value);
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, description: 0 } }
        })
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
    }
    useEffect(() => {
        if (data)
            setTextFieldValue(data?.description || data?.edited?.description)
        if (data !== undefined) {
            if (data.description !== "") {
                setSelected([options[0].value])
                setSave((prevSave) => {
                    return { ...prevSave, description: options[0].value }
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
                            Variant Description
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
export default Descriptionofedit;