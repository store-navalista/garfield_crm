import { IJob } from '@/constants/jobs'
import { IUser } from '@/constants/users'
import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { apiRequests } from './helpers/apiRequests'
import { customBaseQuery, setAuthToken } from './helpers/baseQuery'
import { CreateUserData, RefreshResponse, TokenResponse, UpdateJobsData, UpdateUserData } from './helpers/types'

export const api = createApi({
   baseQuery: customBaseQuery,
   endpoints: (builder) => ({
      login: builder.mutation<TokenResponse, { username: string; password: string }>({
         query: ({ username, password }) => ({
            document: gql`
               ${apiRequests.loginRequest}
            `,
            variables: { username, password }
         }),
         async onQueryStarted(_args, { queryFulfilled }) {
            try {
               const { data } = await queryFulfilled

               setAuthToken(data.login.access_token)
            } catch (error) {
               console.error('Login failed', error)
            }
         }
      }),

      refresh: builder.mutation<RefreshResponse, void>({
         query: () => ({
            document: gql`
               ${apiRequests.refreshRequest}
            `
         }),
         async onQueryStarted(_args, { queryFulfilled }) {
            try {
               const { data } = await queryFulfilled
               setAuthToken(data.refresh.access_token)
            } catch (error) {
               console.error('Refresh token failed', error)
            }
         }
      }),

      checkAuth: builder.query<any, void>({
         query: () => ({
            document: gql`
               ${apiRequests.checkAuthRequest}
            `
         }),
         transformResponse: (response: { checkAuth: { id: string } }) => response.checkAuth.id
      }),

      logout: builder.mutation<void, void>({
         query: () => ({
            document: gql`
               ${apiRequests.logoutRequest}
            `
         }),
         async onQueryStarted(_args, { queryFulfilled }) {
            try {
               await queryFulfilled
               setAuthToken('')
            } catch (error) {
               console.error('Logout failed', error)
            }
         }
      }),

      getUser: builder.query<IUser, { userId: string }>({
         query: ({ userId }) => ({
            document: gql`
               ${apiRequests.getUserRequest}
            `,
            variables: { userId }
         }),
         transformResponse: (response: { getUser: IUser }) => response.getUser
      }),

      getCTO: builder.query<IUser, void>({
         query: () => ({
            document: gql`
               ${apiRequests.getCTORequest}
            `
         }),
         transformResponse: (response: { getCTO: IUser }) => response.getCTO
      }),

      getUsers: builder.query<IUser[], void>({
         query: () => ({
            document: gql`
               ${apiRequests.getUsersRequest}
            `
         }),
         transformResponse: (response: { getUsers: IUser[] }) => response.getUsers
      }),

      getJobsByUserId: builder.query<IJob, { userId: string }>({
         query: ({ userId }) => ({
            document: gql`
               ${apiRequests.getJobsByUserIdRequest}
            `,
            variables: { userId }
         }),
         transformResponse: (response: { getJobsByUserIdAndPeriod: IJob }) => response.getJobsByUserIdAndPeriod
      }),

      getJobsByUserIdAndPeriod: builder.query<IJob[], { userId: string; period: string }>({
         query: ({ userId, period }) => ({
            document: gql`
               ${apiRequests.getJobsByUserIdAndPeriodRequest}
            `,
            variables: { userId, period }
         }),
         transformResponse: (response: { getJobsByUserIdAndPeriod: IJob[] }) => response.getJobsByUserIdAndPeriod
      }),

      updateJobsByUserIdAndPeriod: builder.mutation<IJob, UpdateJobsData>({
         query: (updateJobsData) => ({
            document: gql`
               ${apiRequests.updateJobsByUserIdAndPeriodRequest}
            `,
            variables: { updateJobsData }
         }),
         transformResponse: (response: { getJobsByUserIdAndPeriod: IJob }) => response.getJobsByUserIdAndPeriod
      }),

      createUser: builder.mutation<IUser, CreateUserData>({
         query: ({
            describe_name,
            describe_date,
            describe_specialization,
            describe_position,
            describe_password,
            CTO = false
         }) => ({
            document: gql`
               ${apiRequests.createUserRequest}
            `,
            variables: {
               describe_name,
               describe_date,
               describe_specialization,
               describe_position,
               describe_password,
               CTO
            }
         }),
         transformResponse: (response: { createUser: IUser }) => response.createUser
      }),

      deleteUser: builder.mutation<IUser['id'], { id: string }>({
         query: ({ id }) => ({
            document: gql`
               ${apiRequests.deleteUserRequest}
            `,
            variables: { id }
         }),
         transformResponse: (response: { deleteUser: IUser['id'] }) => response.deleteUser
      }),

      updatePassword: builder.mutation<boolean, { id: string; newPassword: string }>({
         query: ({ id, newPassword }) => ({
            document: gql`
               ${apiRequests.updatePasswordRequest}
            `,
            variables: { id, newPassword }
         }),
         transformResponse: (response: boolean) => response
      }),

      updateUser: builder.mutation<IUser, { id: string; updateUserData: UpdateUserData }>({
         query: ({ id, updateUserData }) => ({
            document: gql`
               ${apiRequests.updateUserRequest}
            `,
            variables: {
               id,
               updateUserData
            }
         }),
         transformResponse: (response: { updateUser: IUser }) => response.updateUser
      }),

      getCurrencyRate: builder.query<Record<string, string>, { pair: [string, string] }>({
         query: ({ pair }) => ({
            document: gql`
               ${apiRequests.getCurrencyRateRequest}
            `,
            variables: { pair }
         }),
         transformResponse: (response: { getCurrency: Record<string, string> }) => response.getCurrency
      })
   })
})

export const {
   useGetUsersQuery,
   useGetUserQuery,
   useGetJobsByUserIdAndPeriodQuery,
   useGetJobsByUserIdQuery,
   useUpdateJobsByUserIdAndPeriodMutation,
   useCreateUserMutation,
   useDeleteUserMutation,
   useUpdatePasswordMutation,
   useUpdateUserMutation,
   useLoginMutation,
   useGetCTOQuery,
   useGetCurrencyRateQuery,
   useLogoutMutation,
   useRefreshMutation,
   useCheckAuthQuery
} = api
