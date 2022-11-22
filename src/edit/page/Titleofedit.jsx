import {
    Page,
    Layout,
    Card,
    TextContainer,
    Text,
    TextField,
    ChoiceList,
    SettingToggle,
} from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function Titleofedit({ data, setSave, save }) {

    console.log(data?.title, "title data");

    const [selected, setSelected] = useState(["Set the same Product title for Shopify and Amazon"]);
    const [textFieldValue, setTextFieldValue] = useState("");
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
            label: "Set the same Product title for Shopify and Amazon",
            value: data?.title,
        },
        {
            label: "Set a Custom Product Title for Amazon",
            value1: "custom",
            renderChildren,
        },
    ]


    function handleChoiceListChange(value) {
        console.log(value, "value");
        setSelected(value);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
         setSave((prevSave) => {
            return { ...prevSave, unset: {...prevSave.unset, custom_text:value} }
        })
    }


    useEffect(() => {
        if (data !== undefined) {
            if (data.title!=="") {
                setSelected([options[0].value])
                setSave((prevSave) => {
                    return { ...prevSave, title: options[0].value }
                })
            } else {
                setSelected([options[1].value])
                setSave((prevSave) => {
                    return { ...prevSave, unset: {...prevSave.unset, title: options[1].value } }
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