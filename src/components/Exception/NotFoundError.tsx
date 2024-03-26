import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

const NotFoundError = ({ message }) => {
  const intl = useIntl();
  const t = intl.formatMessage;
  const notFoundMessage =
    message ||
    t({
      id: 'exception.description.404',
    });
  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle={notFoundMessage}
      extra={
        <div>
          <Link to="/">
            <Button type="default">
              {t({
                id: 'exception.back',
              })}
            </Button>
          </Link>
          <Button
            style={{ marginLeft: '1rem' }}
            type="primary"
            onClick={() => window.location.reload()}
          >
            {t({
              id: 'exception.refresh',
            })}
          </Button>
        </div>
      }
    />
  );
};
export default NotFoundError;
