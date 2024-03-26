import { BASE_URL } from '@/config';
import { setCurrentUser, setIsSignedIn } from '@/reducers/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers: { set: (arg0: string, arg1: string) => void; }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // const _refreshToken = localStorage.getItem('refreshToken');
    // try to get a new tokens
    const refreshResult = await baseQuery(
      {
        credentials: 'include',
        url: 'auth/refresh-token',
        // body: { refreshToken: _refreshToken },
        method: 'POST',
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // store the new token
      const { accessToken } = refreshResult.data as {
        // const { accessToken, refreshToken } = refreshResult.data as {
        // refreshToken: string;
        accessToken: string;
      };
      localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.clear();
      if (api.util?.resetApiState) {
        api.dispatch(api.util.resetApiState());
      }
      api.dispatch(setIsSignedIn(false));
    }
  }
  return result;
};

export const qrCodeDashCompanyApi = createApi({
  reducerPath: 'qrCodeDashCompanyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ["FOLDERS", "FILES"],

  endpoints: (builder: { mutation: (arg0: { query: (userInfo: any) => { url: string; method: string; body: any; }; onQueryStarted: (_: any, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any; }) => Promise<void>; }) => any; query: (arg0: { query: () => string; onQueryStarted: (_: any, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any; }) => Promise<void>; }) => any; }) => ({
    signIn: builder.mutation({
      query: (userInfo: any) => ({
        url: 'auth/login',
        method: 'POST',
        body: userInfo,
      }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        try {
          const {
            data: { accessToken, refreshToken },
          } = await queryFulfilled;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(setIsSignedIn(true));
          window.location.replace('/');
        } catch (err) {
          console.log('🚀 ~ file: api.ts:67 ~ onQueryStarted: ~ err:', err);
        }
      },
    }),
    getCurrentUser: builder.query({
      query: () => 'users/me',
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        try {
          const { data: currentUser } = await queryFulfilled;
          dispatch(setCurrentUser(currentUser));
        } catch (err) {
          console.log('🚀 ~ file: api.ts:67 ~ onQueryStarted: ~ err:', err);
        }
      },
    }),
    GetFolders: builder.query({
      query: () => 'folders',
      providesTags: ['FOLDERS'],
    }),
    createFolder: builder.mutation({
      query: (folderInfo: any) => ({
        url: 'folders',
        method: 'POST',
        body: folderInfo,
      }),
      invalidatesTags: ['FOLDERS'],
    }),
    GetFiles: builder.query({
      query: (id: string) => `folders/${id}/documents`,
      providesTags: ['FILES'],
    }),
    createFile: builder.mutation({
      query: ({ id, values }) => {
        const bodyFormData = new FormData();
        Object.keys(values).forEach((value) => {
          bodyFormData.append(value, values[value]);
        });
        return {
          url: `folders/${id}/documents`,
          method: 'POST',
          body: bodyFormData,
          formData: true,
          prepareHeaders: (headers: any) => {
            headers.set('Content-Type', 'multipart/form-data');
            return headers;
          },
        };
      },
      invalidatesTags: ['FILES'],
    }),
    DeleteFile: builder.mutation({
      query: ({ id }) => ({
        url: `documents/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['FILES'],
    }),
    DeleteFolder: builder.mutation({
      query: ({ id }) => ({
        url: `folders/${id}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['FOLDERS'],
    })
  }),
});

export const {
  useSignInMutation,
  useGetCurrentUserQuery,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useGetFilesQuery,
  useCreateFileMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
} = qrCodeDashCompanyApi;
