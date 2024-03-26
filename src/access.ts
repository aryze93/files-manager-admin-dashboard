import { CurrentUser, CurrentUserRole } from '@/utils/types/models/user-model';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  const role = currentUser?.role;

  return {};
}
