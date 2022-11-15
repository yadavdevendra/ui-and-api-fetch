import { Card, Page, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function TabExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    { content: "All" },
    { content: "Not Listed 64" },
    { content: "Inactive" },
    { content: "Incomplete" },
    { content: "Active" },
    { content: "Error" },
  ];
  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
      </Tabs>
    </Card>
  );
}
export default TabExample;