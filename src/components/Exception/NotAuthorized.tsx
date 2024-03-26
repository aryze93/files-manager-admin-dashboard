import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

const NotAuthorized = () => {
  const intl = useIntl();
  const t = intl.formatMessage;
  return (
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle={t({
        id: 'exception.description.403',
      })}
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
export default NotAuthorized;
