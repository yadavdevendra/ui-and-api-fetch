import {ResourceList,Filters, Page, Button, Card} from "@shopify/polaris";
  
  function FillterExample() {
    const filters = [
      {
        key: "MoreFillter",
        label: "More Fillter",
        shortcut: true
      }
     
    ]
    return (
      <div style={{display:"flex"}}>
      <Card></Card>
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
          <div style={{}}>
          <Button>ADADA</Button>
          <Button>ADADA</Button>
          <Button>ADADA</Button>
          </div>
      </div>
    );
  }
  
  export default FillterExample;
  