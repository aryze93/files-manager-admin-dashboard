import CustomPageContainer from '@/layouts/CustomPageContainer';
import React from 'react';
import { ProColumns } from '@ant-design/pro-table/es/typing';
import ListSection from './components/ListSection';

export default function ListPage({
  title,
  columns,
  search,
  toolBarRender,
  useGetListQuery,
  pagination,
  tableRef,
  expand,
  extraQueryParam,
}: Readonly<{
  title: string;
  columns: ProColumns[];
  search?: boolean;
  toolBarRender?: React.ReactNode[];
  useGetListQuery: any;
  pagination?: any;
  tableRef?: React.MutableRefObject<any>;
  expand?: boolean;
  extraQueryParam?: any;
}>) {
  return (
    <CustomPageContainer title={title}>
      <ListSection
        title={title}
        columns={columns}
        useGetListQuery={useGetListQuery}
        search={search}
        toolBarRender={toolBarRender}
        pagination={pagination}
        tableRef={tableRef}
        expand={expand}
        extraQueryParam={extraQueryParam}
      />
    </CustomPageContainer>
  );
}
