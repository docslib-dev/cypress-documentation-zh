import React from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

interface VueSyntaxTabsProps {
  children: React.ReactNode;
}

const VueSyntaxTabs: React.FC<VueSyntaxTabsProps> = ({children}) => {
  return (
    <Tabs groupId="vue-syntax-tabs">
      <TabItem value="vuejsx" label="JSX语法">
        {children[0]}
      </TabItem>
      <TabItem value="vuevtu" label="VTU语法">
        {children[1]}
      </TabItem>
    </Tabs>
  )
}

export default VueSyntaxTabs