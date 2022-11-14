import {ResourceList,Filters} from "@shopify/polaris";
  
  function FillterExample() {
    const filters = [
      {
        key: "SyncStatus",
        label: "Sync Status",
        shortcut: true
      },
      {
        key: "AmazonLockup",
        label: "Amazon Lockup",
        shortcut: true
      },
      {
        key: "BulkUpdate",
        label: "Bulk update",
        shortcut: true
      },
    ]
    return (
      <div >
          <ResourceList
            filterControl={
              <Filters
                filters={filters}
              />
            
            }
            items={[
              {
                id: 341,
              },
              {
                id: 256,
              }
            ]}
            renderItem={() => {
              return (
                <h1></h1>
              );
            }}
          />
      </div>
    );
  }
  
  export default FillterExample;
  