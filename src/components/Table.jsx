import { DataTable, Grid, Page, Thumbnail } from "@shopify/polaris";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { rows } from "../Data/Data";

function Table() {
  const [rows, setRows] = useState([])

  console.log("arr", rows);
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
          "count":50,
         "productOnly":true,
         "target_marketplace":'eyjtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQi0m51bGx9',

        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.rows);
        data.data.rows.map(elem => {
          // console.log(elem,'asdfafds')
          tempRows.push([
            <Thumbnail source={elem?.['main_image']} />,
           <Link to='/listing/templet'> {elem['title']}</Link>,
            ...test(elem['items'], elem['source_product_id']),
            elem['variant_attributes'],
          ])
        })
        setRows(tempRows);
      });
  }

  function test(items, elem) {
    // console.log("functionitem",elem,items)
    let temp = 0
    let product = 0
    // console.log("temp",product)
    items.map(element => {
      if (element['source_product_id'] === elem) {
        product = <>
        <h1 style={{textAlign:"left"}}>Price:{element.price ||"N/A"}</h1>
        <h1 style={{textAlign:"left"}}>Barcode:{element.barcode ||"N/A"}</h1>
        <h1 style={{textAlign:"left"}}>SKU:{element.sku}</h1>
        <h1 style={{textAlign:"left"}}>ASIN:{element.asin ||"N/A"}</h1>
        
        </>
      }
      // product.barcode = element.barcode
     if(element['quantity']) {
      temp += element['quantity']
     }
    })
    return [product,temp]
  }

  useEffect(() => {
    getData()
  }, []);
  return (
    <Page fullWidth>
      <Grid columns={{ xs: 2, sm: 4, md: 4, lg: 2, xl: 12 }}>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
          <DataTable 
            columnContentTypes={[
              "text",
              "text",
              "text",
              "text",
              "text",
            ]}
            headings={[
              "Image",
              "Title",
              "product",
              "inventry",
              "Variant Attribute",
            ]}
            rows={rows}

          />
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
export default Table;
