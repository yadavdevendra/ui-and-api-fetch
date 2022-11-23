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

function Titleofedit({ data, setSave, save }) {
    const [selected, setSelected] = useState(["Set the same Product title for Shopify and Amazon"]);
    const [textFieldValue, setTextFieldValue] = useState("");
    function handleSubmit(e){
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, title: Number(prevSave.unset.title) + 1 } }
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
            label: "Set the same Product title for Shopify and Amazon",
            value: data?.title,
        },
        {
            label: "Set a Custom Product Title for Amazon",
            value1: "cutom",
            renderChildren,
        },
    ]


    function handleChoiceListChange(value) {
        setSelected(value);
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, title: 0 } }
        })
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
    }


    useEffect(() => {
        if (data)
            setTextFieldValue(data?.title || data?.edited?.title)
        if (data !== undefined) {
            if (data.title !== "") {
                setSelected([options[0].value])
                setSave((prevSave) => {
                    return { ...prevSave, title: options[0].value }
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
export default Titleofedit;