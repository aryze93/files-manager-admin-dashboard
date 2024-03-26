import { Badge } from 'antd';
import { useIntl } from '@umijs/max';
import { STATUS } from '@/utils/constants';

const Status = ({ status }: { status: STATUS }) => {
  const intl = useIntl();
  const t = intl.formatMessage;
  switch (status) {
    case STATUS.ACTIVE:
      return <Badge status="success" text={t({ id: 'global.status.active' })} />;
    case STATUS.INACTIVE:
      return <Badge status="warning" text={t({ id: 'global.status.inactive' })} />;
    case STATUS.DISABLED:
      return <Badge status="error" text={t({ id: 'global.status.disabled' })} />;
  }
};

export default Status;
