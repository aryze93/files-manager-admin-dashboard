import React from 'react';
import { history } from '@umijs/max';
import { TabPaneProps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import './style.css';
import { usePathInfo } from '@/hooks/usePathInfo';
import Breadcrumb from '@/components/Breadcrumb';

interface CustomPageContainerProps {
  title: string;
  children: React.ReactNode;
  tabList?: TabPaneProps[];
  currentTab?: string;
  onTabChange?: (activeKey: string) => void;
  extra?: React.ReactNode;
}

export default function CustomPageContainer({
  title,
  children,
  tabList,
  currentTab,
  onTabChange,
  extra,
}: Readonly<CustomPageContainerProps>) {
  const { isParent, currentPath } = usePathInfo();

  const optionalProps: Record<any, any> = {};

  if (!isParent) {
    optionalProps.onBack = () => {
      switch (currentPath) {
        default: {
          history.back();
        }
      }
    };
  }

  return (
    <PageContainer
      header={{
        title,
      }}
      extra={extra}
      breadcrumbRender={({ breadcrumb }) => <Breadcrumb paths={breadcrumb?.items} />}
      tabActiveKey={currentTab}
      tabList={tabList}
      onTabChange={onTabChange}
      {...optionalProps}
    >
      {children}
    </PageContainer>
  );
}
