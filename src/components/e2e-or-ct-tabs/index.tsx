import React from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

interface E2eOrCtTabsProps {
  children: React.ReactNode;
}

const E2EOrCtTabs: React.FC<E2eOrCtTabsProps> = ({children}) => {
  return (
    <Tabs groupId="e2e-or-ct-tabs">
      <TabItem value="e2e" label="端到端测试">
        {children[0]}
      </TabItem>
      <TabItem value="ct" label="组件测试">
        {children[1]}
      </TabItem>
    </Tabs>
  )
}

export default E2EOrCtTabs