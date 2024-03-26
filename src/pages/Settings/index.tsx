import { SmileOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Result } from 'antd';
import React from "react";

const TransactionsPage: React.FC = () => {
  const intl = useIntl();
  const t = intl.formatMessage;
  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title={
          <span style={{ fontWeight: 450, fontSize: 24, letterSpacing: 5 }}>
            {"Settings"}
          </span>
        }
        style={{ marginTop: '10%', marginBottom: '20%' }}
      />
    </div>
  );
};

export default TransactionsPage;
