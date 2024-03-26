import { Button, Result } from 'antd';
import { Link, useIntl } from 'umi';

const ServerError = () => {
  const intl = useIntl();
  const t = intl.formatMessage;
  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle={t({
        id: 'exception.description.500',
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
export default ServerError;
