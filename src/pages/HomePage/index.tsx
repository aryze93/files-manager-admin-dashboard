import ListPage from "@/components/ListPage";
import { history, useIntl } from "@umijs/max";
import React, { useRef, useState } from "react";
import AddFolderForm from "./components/AddFolderForm";
import { Button, Dropdown, MenuProps, message } from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDeleteFolderMutation, useGetFoldersQuery } from "@/services/api";
import { ProColumns } from "@ant-design/pro-table/es";
import ConfirmModal from "@/components/ConfirmModal";

export default function HomePage() {
  const actionRef = useRef();
  const intl = useIntl();
  const t = intl.formatMessage;
  const [showAddFolderForm, setShowAddFolderForm] = useState(false);
  const [deleteState, setDeleteState] = useState({
    confirmModal: false,
    itemId: null,
  });
  const [deleteFolder, { isLoading: deleteFolderLoading }] =
    useDeleteFolderMutation();

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
        label: t({ id: "global.action.detail" }),
        icon: <DeleteOutlined />,
        danger: true,
      },
    ];
  };

  let columns = [
    {
      title: t({ id: "global.name" }),
      dataIndex: "name",
      valueType: "text",
      hideInSearch: true,
      onCell: (row: any) => {
        return {
          onClick: () => {
            history.push(`/${row.id}/files`);
          },
        };
      },
    },
    {
      title: t({ id: "cols.createdAt" }),
      dataIndex: "createdAt",
      valueType: "dateTime",
      hideInSearch: true,
      onCell: (row: any) => {
        return {
          onClick: () => {
            history.push(`/${row.id}/files`);
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
  ] as ProColumns[];

  const deleteFileFn = (id: string) => {
    deleteFolder({ id })
      .unwrap()
      .then(() => {
        actionRef.current?.reload();
        message.success(t({ id: "folder.delete.success" }));
        setDeleteState({
          confirmModal: false,
          itemId: null,
        });
      })
      .catch(() => {
        message.error(t({ id: "folder.delete.error" }));
        setDeleteState({
          confirmModal: false,
          itemId: null,
        });
      });
  };

  return (
    <>
      <ListPage
        title={t({ id: "folder.list.title" })}
        columns={columns}
        useGetListQuery={useGetFoldersQuery}
        search={true}
        expand={false}
        tableRef={actionRef}
        extraQueryParam={{}}
        toolBarRender={[
          <>
            <Button
              key="button"
              icon={<PlusOutlined />}
              onClick={() => {
                setShowAddFolderForm(true);
              }}
              type="primary"
            >
              {t({ id: "folder.add.btn.label" })}
            </Button>
            {showAddFolderForm && (
              <AddFolderForm
                visible={showAddFolderForm}
                setVisible={setShowAddFolderForm}
                tableActionRef={actionRef}
              />
            )}
          </>,
        ]}
      />

      {deleteState.confirmModal && (
        <ConfirmModal
          title={t({ id: "folder.delete.confirm" })}
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
}
