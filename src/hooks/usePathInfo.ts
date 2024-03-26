import { useLocation } from '@umijs/max';

export function usePathInfo() {
  const location = useLocation();
  const { pathname } = location;
  const currentPath = pathname.split('/')[1];
  const isParent = pathname.split('/').length === 2;
  const lastPath = pathname.split('/').slice(-1)[0];

  return { isParent, currentPath, lastPath, pathname };
}
