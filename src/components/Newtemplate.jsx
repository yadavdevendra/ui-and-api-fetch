import { IndexTable, Card, useIndexResourceState, Text, Thumbnail, Link } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function SimpleIndexTableExample() {
    const [customers, setCustomers] = useState([])
    //   const customers = [];
    console.log("arr", customers);
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw`;

    async function getData() {
        let tempRows = [];
        await fetch(`https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Ced-Source-Id": 500,
                    "Ced-Source-Name": "shopify",
                    "Ced-Target-Id": 640,
                    "Ced-Target-Name": "amazon",
                    "count": 50,
                    "productOnly": true,
                    "target_marketplace": 'eyjtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQi0m51bGx9',

                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data.rows);
                data.data.rows.map(elem => 
                    // console.log(elem,'asdfafds')
                   

                    tempRows.push([
                        <IndexTable.Row>
                        <IndexTable.Cell>
                            <Text variant="bodyMd" fontWeight="bold" as="span"><Thumbnail source={elem?.['main_image']} /></Text>
                        </IndexTable.Cell>
                        <IndexTable.Cell> <Link to='/listing/templet'>{elem['title']}</Link></IndexTable.Cell>
                        <IndexTable.Cell>...test(elem['items'],elem['source_product_id'])</IndexTable.Cell>
                        <IndexTable.Cell>{elem['variant_attributes']}</IndexTable.Cell>
                        </IndexTable.Row>
                    ])



                )
               
                setCustomers(tempRows);
            });
    }
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    // const rowMarkup = customers.map(
    //     ({name}, index) => (
    //         <IndexTable.Row

    //             key={index}
    //             selected={selectedResources.includes(index)}
    //             position={index}
    //         >
    //             <IndexTable.Cell>
    //                 <Text variant="bodyMd" fontWeight="bold" as="span">
    //                     {name}
    //                 </Text>
    //             </IndexTable.Cell>
    //             <IndexTable.Cell>rfsvfgs</IndexTable.Cell>
    //             <IndexTable.Cell>sg</IndexTable.Cell>
    //             <IndexTable.Cell>grg</IndexTable.Cell>
    //         </IndexTable.Row>
    //     ),
    // );
    function test(items, elem) {
        // console.log("functionitem",elem,items)
        let temp = 0
        let product = 0
        // console.log("temp",product)
        items.map(element => {
            if (element['source_product_id'] === elem) {
                product = <>
                    <h1 style={{ textAlign: "left" }}>Price:{element.price || "N/A"}</h1>
                    <h1 style={{ textAlign: "left" }}>Barcode:{element.barcode || "N/A"}</h1>
                    <h1 style={{ textAlign: "left" }}>SKU:{element.sku}</h1>
                    <h1 style={{ textAlign: "left" }}>ASIN:{element.asin || "N/A"}</h1>

                </>
            }
            // product.barcode = element.barcode
            if (element['quantity']) {
                temp += element['quantity']
            }
        })
        return [product, temp]
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Card>
            <IndexTable
                resourceName={resourceName}
                itemCount={customers.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Image' },
                    { title: 'Title' },
                    { title: 'product' },
                    { title: 'inventry' },
                    { title: 'Variant Attribute' },
                 
                ]}
            >
                {customers}
            </IndexTable>
        </Card>
    );
}


export default SimpleIndexTableExample;