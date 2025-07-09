import React from 'react';
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

interface CypressConfigFileTabsProps {
  children: React.ReactNode;
}

const CypressConfigFileTabs: React.FC<CypressConfigFileTabsProps> = ({ children }) => {
  return (
    <Tabs groupId="config-file-tabs">
      <TabItem value="js" label="cypress.config.js 文件">
        {children && children[0]}
      </TabItem>
      <TabItem value="ts" label="cypress.config.ts 文件">
        {children && children[1]}
      </TabItem>
    </Tabs>
  )
};

export default CypressConfigFileTabs;