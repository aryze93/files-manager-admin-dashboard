import ProTable from '@ant-design/pro-table';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import React, { useRef } from 'react';
import { CurrentUser } from '@/utils/types/models/user-model';

export default function ListSection({
  title,
  columns,
  useGetListQuery,
  toolBarRender,
  tableRef,
  expand = true,
  search = true,
  pagination = {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50],
  },
}: any) {
  const { initialState } = useModel('@@initialState');
  const { currentUser }: { currentUser?: CurrentUser | null } = initialState || {};
  const { data, isFetching } = useGetListQuery();
  let actionRef = useRef();
  if (tableRef) actionRef = tableRef;
  const rowClassName = useEmotionCss(() => {
    return {
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1, 1.01)',
        cursor: 'pointer',
      },
      '> td': {
        padding: '15px !important',
      },
    };
  });

  return (
    <ProTable
      headerTitle={title}
      rowClassName={rowClassName}
      actionRef={actionRef}
      rowKey={(item) => item.id}
      columns={columns}
      dataSource={data || []}
      loading={isFetching}
      options={false}
      toolBarRender={() => [...toolBarRender]}
      pagination={pagination}
      search={search}
      scroll={expand ? { x: 1500 } : undefined}
    />
  );
}
