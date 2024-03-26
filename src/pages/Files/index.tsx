import {
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumnType } from "@ant-design/pro-table";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Button, Dropdown, MenuProps, message } from "antd";
import React, { useRef, useState } from "react";
import { history, useIntl, useParams } from "@umijs/max";
import { useDeleteFileMutation, useGetFilesQuery } from "@/services/api";
import AddFileForm from "./components/AddFileForm";
import ConfirmModal from "@/components/ConfirmModal";

const FilesPage: React.FC = () => {
  const intl = useIntl();
  const t = intl.formatMessage;
  const { id } = useParams();
  const actionRef = useRef<ActionType | undefined>();
  const { data, isLoading, isFetching } = useGetFilesQuery(id);
  const [showAddFileForm, setShowAddFileForm] = useState(false);
  const [deleteState, setDeleteState] = useState({
    confirmModal: false,
    itemId: null,
  });
  const [deleteFile, { isLoading: deleteFileLoading }] =
    useDeleteFileMutation();

  const tableClassName = useEmotionCss(() => {
    return {
      border: "1.5px solid #ecf0f1",
      paddingBottom: 15,
    };
  });

  const rowClassName = useEmotionCss(() => {
    return {
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1, 1.01)",
        cursor: "pointer",
      },
      "> td": {
        padding: "15px !important",
      },
    };
  });

  const onMenuClick: (item: any) => MenuProps["onClick"] =
    (item: any) =>
    ({ key }) => {
      switch (key) {
        case "delete": {
          setDeleteState({
            confirmModal: true,
            itemId: item.id,
          });
          return;
        }
        default:
          return null;
      }
    };

  const createTableActionMenu = (): MenuProps["items"] => {
    return [
      {
        key: "delete",
        label: t({ id: "global.action.delete" }),
        icon: <DeleteOutlined />,
        danger: true,
      },
    ];
  };

  const columns: ProColumnType<any, string>[] = [
    {
      title: t({ id: "cols.name" }),
      dataIndex: "name",
      valueType: "text",
      hideInSearch: true,
      render: (value: any) => {
        return <div style={{ fontWeight: 450, paddingLeft: 5 }}>{value}</div>;
      },
      onCell: (row: any) => {
        return {
          onClick: () => {
            window.open(row.url, "_blank");
          },
        };
      },
    },
    {
      title: t({ id: "cols.createdAt" }),
      dataIndex: "createdAt",
      valueType: "dateTime",
      sorter: true,
      hideInSearch: true,
      onCell: (row: any) => {
        return {
          onClick: () => {
            window.open(row.url, "_blank");
          },
        };
      },
    },
    {
      title: t({ id: "global.action" }),
      width: 100,
      hideInSearch: true,
      render: (text: any, row: any) => {
        return [
          <Dropdown
            key={row.id}
            menu={{
              items: createTableActionMenu(),
              onClick: onMenuClick(row),
            }}
          >
            <EllipsisOutlined style={{ fontSize: 18, paddingLeft: 10 }} />
          </Dropdown>,
        ];
      },
    },
  ];

  const deleteFileFn = (id: string) => {
    deleteFile({ id })
      .unwrap()
      .then(() => {
        actionRef.current?.reload();
        message.success(t({ id: "file.delete.success" }));
        setDeleteState({
          confirmModal: false,
          itemId: null,
        });
      })
      .catch(() => {
        message.error(t({ id: "file.delete.error" }));
        setDeleteState({
          confirmModal: false,
          itemId: null,
        });
      });
  };

  return (
    <>
      <PageContainer
        header={{
          title: t({ id: "file.list.title" }),
        }}
        onBack={() => history.back()}
      >
        <ProTable
          tableClassName={tableClassName}
          actionRef={actionRef}
          rowKey={(record) => record.id}
          dataSource={data}
          loading={isLoading || isFetching}
          columns={columns}
          options={false}
          search={false}
          rowClassName={rowClassName}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50],
            showSizeChanger: true,
            style: { marginRight: 16 },
          }}
          toolBarRender={() => [
            <>
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => {
                  setShowAddFileForm(true);
                }}
                type="primary"
              >
                {t({ id: "file.add.btn.label" })}
              </Button>
              {showAddFileForm && (
                <AddFileForm
                  visible={showAddFileForm}
                  setVisible={setShowAddFileForm}
                  tableActionRef={actionRef}
                />
              )}
            </>,
          ]}
        />
      </PageContainer>
      {deleteState.confirmModal && (
        <ConfirmModal
          title={t({ id: "file.delete.confirm" })}
          visible={deleteState.confirmModal}
          setVisible={(visibility: boolean) =>
            setDeleteState((prevState) => ({
              ...prevState,
              confirmModal: visibility,
            }))
          }
          actionFct={deleteFileFn}
          id={deleteState?.itemId}
        />
      )}
    </>
  );
};

export default FilesPage;
