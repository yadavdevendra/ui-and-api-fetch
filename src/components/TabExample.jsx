import { Badge, Card,Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function TabExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    {
      content: (
        <span>
          All <Badge>10+</Badge>
        </span>
      )
    },
    {
      content: (
        <span>
          Not Listed <Badge>64</Badge>
        </span>
      )
    },
    {
      content: (
        <span>
          Inactive <Badge>1</Badge>
        </span>
      )
    },
    {
      content: (
        <span>
          Incomplete <Badge>0</Badge>
        </span>
      )
    },
    {
      content: (
        <span>
          Active <Badge>0</Badge>
        </span>
      )
    },
    {
      content: (
        <span>
          Error <Badge>0</Badge>
        </span>
      )
    },
  ];
  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
      </Tabs>
    </Card>
  );
}
export default TabExample;