import { Page, Layout, Card, TextContainer, Text, TextField, ChoiceList, Form, } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

function Barcodeofedit({ data, setSave, save }) {
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");

    function handleSubmit(e){
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, barcode: Number(prevSave?.unset?.barcode?? 0) + 1 } }
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
            label: "Set the same Product Barcode for Shopify and Amazon",
            value: data?.barcode,
        },
        {
            label: "Set a Custom Product Barcode for Amazon",
            value:  data?.title||textFieldValue,
            renderChildren,
        },
    ]

    function handleChoiceListChange(value) {
        setSelected(value);
        console.log("selected", selected);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);
        console.log("textFieldValue", textFieldValue);
    }

    useEffect(() => {
        if(data)
        setTextFieldValue(data?.barcode||data?.edited?.barcode)
        if (data !== undefined ) {
            if (data.barcode!=="") {
                setSelected(options[0].value)
                setSave((prevSave) => {
                    return { ...prevSave, barcode: options[0].value }
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
export default Barcodeofedit;