import { Link } from '@umijs/max';
import './styles.scss';

function Breadcrumb({
  paths,
}: {
  paths: { breadcrumbName: string; title: string; linkPath: string }[] | undefined;
}) {
  if (!paths || paths.length <= 1) return null;

  return (
    <nav className="breadcrumb">
      <ol>
        {paths.map((path, idx) => (
          <>
            {idx !== paths.length - 1 ? (
              <li key={path.breadcrumbName}>
                <Link to={path.linkPath} replace>
                  {path.title}
                </Link>
              </li>
            ) : (
              <li key={path.breadcrumbName}>
                <span>{path.title}</span>
              </li>
            )}
            {idx !== paths.length - 1 && <li className="breadcrumb__divider">/</li>}
          </>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
