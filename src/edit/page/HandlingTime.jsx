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
    const [selected, setSelected] = useState([]);
    const [textFieldValue, setTextFieldValue] = useState("");
    function handleSubmit(e) {
        setSave((prevSave) => {
            return { ...prevSave, unset: { ...prevSave.unset, handletime: 1 } }
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
            label: "Use the same Handling Time As in the Product Template",
            value: data?.handletime
        },
        {
            label: "Set a Custom Handling Time",
            value: data?.title || textFieldValue,
            renderChildren,
        },
    ]
    function handleChoiceListChange(value) {
        setSelected(value);
        const { unset, ...keep } = save
        setSave(keep)

        // console.log("selected", selected);
    }

    function handleTextFieldChange(value) {
        setTextFieldValue(value);

        // console.log("textFieldValue", textFieldValue);
    }
    useEffect(() => {
        if (data)
            setTextFieldValue(data?.handletime)
        if (data !== undefined) {
            if (data.edited==false) {

                setSelected([options[0].value])
                setSave((prevSave) => {
                    return { ...prevSave, handletime: options[0].value }
                })

            } else {

                setSelected([options[1].value])
                // setSave((prevSave) => {
                //     return { ...prevSave, handletime: options[1].value }
                // })

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
                                "Heading Time"
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