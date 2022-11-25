import React, {useEffect, useState } from "react";
import "antd/dist/antd.css";

import { Space, Table } from "antd";
import { Badge, Checkbox, Stack, Text, Thumbnail } from "@shopify/polaris";
import { Link } from "react-router-dom";
import Popovercom from "./Popovercom";


const Table1 = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw`;
  function test(value) {
    // console.log("value", value);
    let temp = 0
    value.forEach((item) => {
      if (item.quantity) {
        temp += item.quantity
      }

    })
    return temp
  }
  useEffect(() => {
    // we can keep the token in env variable for more security
    setIsLoading(true);
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 640,
          "Ced-Target-Name": "amazon",
          count: 50,
          productOnly: true,
          target_marketplace:
            "eyjtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQi0m51bGx9",
        },
      }
    )
      .then((response) => response.json())
      .then((allData) => {
        // console.log(data.data.rows);
        let newData = allData?.data?.rows?.map((item) => {
          // console.log(item, "item");
          return {
            img: item["main_image"],
            key: item._id["$oid"],
            title: <Link to={`/listing/${item['container_id']}`}>{item["title"]}</Link>,
            product:
              item["source_product_id"] === item.items[0]["source_product_id"]
                ? { sku: item.items[0].sku, price: item.items[0].price || "N/A",
                 barcode: item.items[0].barcode || "N/A",
                 quantity: item.items[0].quantity || "N/A" 
                 }
                : "NA",
            inventory: test(item.items),
            variant_attributes: item["variant_attributes"],
          };
        });
        setProducts(newData);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("products", products);
  return (
    <Table
      columns={[
        {
          align: "left",
          dataIndex: "name",
          key: "name",
          title: "Image",
          render: (_, record) => {
            return (<div style={{ display: "flex" }}>
              <Thumbnail source={record.img} />
            </div>
            )
          },
          width: 100,
        },
        {
          align: "left",
          title: "Title",
          dataIndex: "age",
          key: "age",
          render: (_, record) => {
            return (
              <Stack>
                <Text>{record.title}</Text>
              </Stack>
            );
          },
        },
        {
          align: "left",
          title: "product",
          dataIndex: "address",
          key: "address",
          render: (_, record) => {
            return (
              <Stack vertical>
                <Badge>SKU:{record.product.sku}</Badge>
                <Badge>Price:{record.product.price}</Badge>
                <Badge>Barcode:{record.product.barcode}</Badge>
                <Badge>Quantity:{record.product.quantity}</Badge>
              </Stack>
            );
          },
        },
        {
          align: "center",
          dataIndex: "inventory",
          key: "inventory",
          title: "Inventory",
          render: (_, record) => {
            return (
              <Stack>
                <Text>{record.inventory}</Text>
              </Stack>
            );
          },
        },
        {
          align: "left",
          dataIndex: "variant_attributes",
          key: "variant_attributes",
          title: "variant_attributes",
        },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <a>
                <Popovercom />
              </a>
            </Space>
          ),
        },
      ]}
      dataSource={products}
      rowSelection={{products}}
    />
  );
};
export default Table1;