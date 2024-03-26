import { useIntl, useParams } from "@umijs/max";
import { ActionType } from "@ant-design/pro-table";
import { useCreateFileMutation } from "@/services/api";
import { ModalForm } from "@ant-design/pro-components";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import { RcFile } from "antd/lib/upload";

interface AddFileFormProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  tableActionRef?: React.MutableRefObject<ActionType | undefined>;
}

function AddFileForm({
  visible,
  setVisible,
  tableActionRef,
}: Readonly<AddFileFormProps>) {
  const intl = useIntl();
  const t = intl.formatMessage;
  const { id } = useParams();
  const [addNewFile, { isLoading }] = useCreateFileMutation();
  const [file, selFile] = useState<RcFile>();

  const handleSubmit = () => {
    addNewFile({values: {name: file?.name, file }, id })
      .unwrap()
      .then(() => {
        setVisible(false);
        message.success(t({ id: "file.add.success" }));
      })
      .catch((error: any) => {
        message.error(error.data ? error.data.message : error.message);
      });
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      selFile(file)
      return false;
    },
  };

  return (
    <ModalForm
      title={t({ id: "file.add.title" })}
      open={visible}
      onOpenChange={setVisible}
      onFinish={handleSubmit}
      loading={isLoading}
    >
      <Upload name="file" maxCount={1} {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </ModalForm>
  );
}

export default AddFileForm;
