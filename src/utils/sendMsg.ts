import { message as msg } from 'antd';
import { formatMessage } from 'umi';

export const sendMsg = (id: string, success: number) => {
     if (success) {
        switch (success) {
        case 1:
            return msg.success(formatMessage({ id }), 3);
        case 0:
            return msg.error(formatMessage({ id }), 3);
        case 2:
            return msg.info(formatMessage({ id }), 3);
        default:
            return msg.error(formatMessage({ id }), 3);
    }
  }
    return msg.error(formatMessage({ id }), 3);
};
