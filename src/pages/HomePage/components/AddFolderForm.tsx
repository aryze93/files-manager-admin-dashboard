import { useIntl } from "@umijs/max";
import { message } from "antd";
import { ActionType } from "@ant-design/pro-table";
import { useCreateFolderMutation } from "@/services/api";
import { ModalForm, ProFormText } from "@ant-design/pro-components";

interface AddFolderFormProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  tableActionRef?: React.MutableRefObject<ActionType | undefined>;
}

function AddFolderForm({
  visible,
  setVisible,
  tableActionRef,
}: Readonly<AddFolderFormProps>) {
  const intl = useIntl();
  const t = intl.formatMessage;
  const [addNewFolder, { isLoading }] = useCreateFolderMutation();

  const handleSubmit = (values: any) =>
    addNewFolder(values)
      .unwrap()
      .then(() => {
        tableActionRef?.current?.reload(true);
        setVisible(false);
        message.success(t({ id: "folder.add.success" }));
      })
      .catch((error: any) => {
        message.error(error.data ? error.data.message : error.message);
      });

  return (
    <ModalForm
      title={t({ id: "folder.add.title" })}
      open={visible}
      onOpenChange={setVisible}
      onFinish={handleSubmit}
      loading={isLoading}
    >
      <ProFormText
        rules={[{ required: true, message: "required!" }]}
        fieldProps={{
          size: "large",
          maxLength: 30,
        }}
        name="name"
        label={t({ id: "cols.name" })}
      />
    </ModalForm>
  );
}

export default AddFolderForm;
