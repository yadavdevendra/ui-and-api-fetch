// import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";

// import { Space, Table } from "antd";
// import { Badge, Stack, Text, Thumbnail } from "@shopify/polaris";
// import { Link } from "react-router-dom";
// import Popovercom from "./Popovercom";

// const Table2= () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const options ={"Ced-Source-Id": 500,
//   "Ced-Source-Name": "shopify",
//   "Ced-Target-Id": 680,
//   "Ced-Target-Name": "amazon",
//   "appCode": "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
//   "appTag": "amazon_sales_channel"
// }
//   const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzNTEyNjYyYTA2ZTU2NDQ1NjRkNWQ1Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk4NDY5MjE0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWI2MWRlY2Q5OGI5MDY0ZTQyMDU3MiJ9.se1AdJSXGQuxlJ1MOjZHH7kA_hwRZgImCIbBE0CC9gSSoAbddFxic5Evzj2hluPFU1AchvyUm83wHMWf5jUMHvrSQSVzwSZA1Xquv9L8Y1KYxZK3gd-f2BbDt6Vj3_-3lQx30JhaccVyXIE38rZ07wj4mMFOi2OWNGZfN5vr_HmB5-rrvDQjGBnoipZufjdZZrvKMhmdoNqL3R5MXciT64qQaN-1AV0Y7sihOQn-Ka9tJ_bDE9Rd791WcTZF4OoxsnpYBN3GcKFmSSzVf4811U3ZSzeZ879GutoOoFBfIbHuUb4L_iRPMbDw8q4CiHbYFfvrCEvvEZmoSON6F5h3YQ`;
//   useEffect(() => {
//     // we can keep the token in env variable for more security
//     setIsLoading(true);
//     fetch(
//       `https://multi-account.sellernext.com/home/public/connector/product/getProduct?target_marketplace=amazon&source_marketplace=shopify&sourceShopID=500&targetShopID=680&container_id=7516581658838`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           ...options,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((allData) => {
//         // console.log(data.data.rows);
//         let newData = allData?.data?.rows?.map((item) => {
//           console.log(item, "item");
//           return {
//             main_image: item["main_image"],
//             key: item._id["$oid"],
//             title: item["title"],
//             product:
//               item["source_product_id"] === item.items[0]["source_product_id"]
//                 ? {sku:item.items[0].sku,price:item.items[0].price||"N/A",barcode:item.items[0].barcode||"N/A"}
//                 : "NA",
//             inventory:item["quantity"],
//             variant_attributes: item["variant_attributes"],
//           };
//         });
//         setProducts(newData);
//         setIsLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   console.log("arr", products);
//   return (
//     <Table
//       columns={[
//         {
//           align: "left",
//           dataIndex: "name",
//           key: "name",
//           title: "Image",
//           render: (_, record) => {
//             return <Thumbnail source={record.main_image} />;
//           },
//           width: 100,
//         },
//         {
//           align: "left",
//           title: "Title",
//           dataIndex: "age",
//           key: "age",
//           render: (_, record) => {
//             return (
//               <Stack>
//                 <Text>{record.title}</Text>
//               </Stack>
//             );
//           },
//         },
//         {
//           align: "left",
//           title: "product",
//           dataIndex: "address",
//           key: "address",
//           render: (_, record) => {
//             return (
//               <Stack vertical>
//                 <Badge>SKU:{record.product.sku}</Badge>
//                 <Badge>Price:{record.product.price}</Badge>
//                 <Badge>Barcode:{record.product.barcode}</Badge>
//               </Stack>
//             );
//           },
//         },
//         {
//           align: "center",
//           dataIndex: "inventory",
//           key: "inventory",
//           title: "Inventory",
//           render: (_, record) => {
//             return (
//               <Stack>
//                 <Text>{record.inventory}</Text>
//               </Stack>
//             );
//           },
//         },
//         {
//           align: "left",
//           dataIndex: "variant_attributes",
//           key: "variant_attributes",
//           title: "variant_attributes",
//         },
//         {
//           title: "Action",
//           key: "action",
//           render: (_, record) => (
//             <Space size="middle">
//               <a>
//                 <Popovercom/>
//               </a>
//             </Space>
//           ),
//         },
//       ]}
//       dataSource={products}
//     />
//   );
// };
// export default Table2