import store from '@/store';
import { Outlet } from '@umijs/max';
import { Provider } from 'react-redux';

function Layout() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default Layout;
