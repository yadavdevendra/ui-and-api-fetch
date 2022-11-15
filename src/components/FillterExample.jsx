import {ResourceList,Filters, Button } from "@shopify/polaris";
  
  function FillterExample() {
    const filters = [
      {
        key: "MoreFillter",
        label: "More Fillter",
        shortcut: true
      },
      {
        key: "MoreFillter",
        label: "More Fillter",
        shortcut: true
      }
     
    ]
    return (

      <div style={{display:"flex",justifyContent:"space-between"}}>
      <div>
          <ResourceList 
            filterControl={
              <Filters
                filters={filters}
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
          <Button>amazon account</Button>
          <Button>select</Button>
          </div>
      </div>
    );
  }
  
  export default FillterExample;
  