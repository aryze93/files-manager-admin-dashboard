import { InfoCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useRef } from "react";

interface ConfirmModalProps {
  title: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  actionFct: (...args: any) => void;
  id?: string | null;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  visible,
  setVisible,
  actionFct,
  id,
}) => {
  const onClick = (e: any) => {
    setVisible(false);
    actionFct(id);
  };
  return (
    <Modal
      title={
        <>
          <InfoCircleFilled
            style={{ color: "#ff6c04", fontSize: 18, paddingTop: 3 }}
          />
          &nbsp;&nbsp; Information
        </>
      }
      open={visible}
      onOk={onClick}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <h4
        style={{ marginLeft: 5, marginTop: 20, marginBottom: 25, fontSize: 15 }}
      >
        {title}
      </h4>
    </Modal>
  );
};

export default ConfirmModal;
