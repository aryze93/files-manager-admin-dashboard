import { qrCodeDashCompanyApi } from '@/services/api';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import reducers from './reducers';

const store = configureStore({
  reducer: {
    ...reducers,
    [qrCodeDashCompanyApi.reducerPath]: qrCodeDashCompanyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(qrCodeDashCompanyApi.middleware),
});

setupListeners(store.dispatch);

export default store;
