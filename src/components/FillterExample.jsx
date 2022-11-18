import {ResourceList,Filters, Button } from "@shopify/polaris";
import { useState } from "react";
  
  function FillterExample() {
    const queryValue='Serach the value'
    const filters = [
      {
        key: "MoreFillter",
        label: "More Fillter",
        shortcut: true
      },
    ]
    return (

      <div style={{display:"flex",justifyContent:"space-between"}}>
      <div>
          <ResourceList
            filterControl={
              <Filters 
                filters={filters}
                queryValue={queryValue}
              />
              
            }
            items={[
              {
                id: 1,
               
              },
              
            ]}
            renderItem={() => {
              return (
                <h1></h1>
              );
            }}
          />
          
          </div>
          <div style={{marginTop:"20px"}}>
          <Button>Symc Status</Button>
          <Button>Amazon Account</Button>
          <Button>Bulk Update</Button>
          </div>
      </div>
    );
  }
  
  export default FillterExample;
  