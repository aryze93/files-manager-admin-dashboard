import CustomPageContainer from '@/layouts/CustomPageContainer';
import { TabPaneProps } from 'antd';
import React from 'react';
export default function PageDetail({
  title,
  tabList,
  currentTab,
  onTabChange,
  children,
}: {
  title: string;
  tabList: TabPaneProps[];
  currentTab?: string;
  onTabChange: (activeKey: string) => void;
  children: React.ReactNode;
}) {
  return (
    <CustomPageContainer
      title={title}
      tabList={tabList}
      onTabChange={onTabChange}
      currentTab={currentTab}
    >
      {children}
    </CustomPageContainer>
  );
}
