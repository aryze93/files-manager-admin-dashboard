import NotFoundError from './NotFoundError';
import ServerError from './ServerError';

const ErrorRenderer = ({ isError, errorCode }: { errorCode: string; isError: boolean }) => {
  if (!isError) return null;
  if (errorCode === 'NOT_FOUND') {
    return <NotFoundError message="Not found" />;
  }
  return <ServerError />;
};

export default ErrorRenderer;
