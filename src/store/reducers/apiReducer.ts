import { IJob } from '@/constants/jobs'
import { IUser } from '@/constants/users'
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'
import Cookies from 'js-cookie'

interface CreateUserData {
   describe_name: string
   describe_date?: string
   describe_specialization?: string
   describe_position?: string
   describe_password: string
   CTO?: boolean
   mail?: string
}

type UpdateUserData = Omit<CreateUserData, 'describe_password'>

interface UpdateJobsData {
   userId: string
   period: string
   jobs: IJob[]
}

export const api = createApi({
   baseQuery: graphqlRequestBaseQuery({
      url: process.env.NEXT_PUBLIC_API,
      prepareHeaders: (headers) => {
         const token = Cookies.get('token')

         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }

         return headers
      }
   }),
   endpoints: (builder) => ({
      getUser: builder.query<IUser, { userId: string }>({
         query: ({ userId }) => ({
            document: gql`
               query GetUser($userId: String!) {
                  getUser(userId: $userId) {
                     id
                     describe_name
                     describe_date
                     describe_specialization
                     describe_position
                     describe_role
                     currentTask
                     describe_password
                     mail
                     jobs {
                        ship_name
                        job_description
                        project_number
                        hours_worked
                        report_period
                        order
                     }
                  }
               }
            `,
            variables: { userId }
         }),
         transformResponse: (response: { getUser: IUser }) => response.getUser
      }),

      getCTO: builder.query<IUser, void>({
         query: () => ({
            document: gql`
               query {
                  getCTO {
                     id
                     describe_name
                     describe_date
                     describe_specialization
                     describe_position
                     describe_role
                     currentTask
                     describe_password
                     mail
                     jobs {
                        ship_name
                        job_description
                        project_number
                        hours_worked
                        report_period
                     }
                  }
               }
            `
         }),
         transformResponse: (response: { getCTO: IUser }) => response.getCTO
      }),

      getUsers: builder.query<IUser[], void>({
         query: () => ({
            document: gql`
               query {
                  getUsers {
                     id
                     describe_name
                     describe_date
                     describe_specialization
                     describe_position
                     describe_role
                     currentTask
                     describe_password
                     mail
                     jobs {
                        ship_name
                        job_description
                        project_number
                        hours_worked
                        report_period
                     }
                  }
               }
            `
         }),
         transformResponse: (response: { getUsers: IUser[] }) => response.getUsers
      }),

      getJobsByUserId: builder.query<IJob, { userId: string }>({
         query: ({ userId }) => ({
            document: gql`
               query GetJobsByUserIdAndPeriod($userId: String!) {
                  getJobsByUserIdAndPeriod(userId: $userId, period: $period) {
                     ship_name
                     job_description
                     project_number
                     hours_worked
                     report_period
                     order
                  }
               }
            `,
            variables: { userId }
         }),
         transformResponse: (response: { getJobsByUserIdAndPeriod: IJob }) => response.getJobsByUserIdAndPeriod
      }),

      getJobsByUserIdAndPeriod: builder.query<IJob[], { userId: string; period: string }>({
         query: ({ userId, period }) => ({
            document: gql`
               query GetJobsByUserIdAndPeriod($userId: String!, $period: String!) {
                  getJobsByUserIdAndPeriod(userId: $userId, period: $period) {
                     id
                     ship_name
                     job_description
                     project_number
                     hours_worked
                     report_period
                     order
                  }
               }
            `,
            variables: { userId, period }
         }),
         transformResponse: (response: { getJobsByUserIdAndPeriod: IJob[] }) => response.getJobsByUserIdAndPeriod
      }),

      updateJobsByUserIdAndPeriod: builder.mutation<IJob, UpdateJobsData>({
         query: (updateJobsData) => ({
            document: gql`
               mutation UpdateJobsByUserIdAndPeriod($updateJobsData: UpdateJobsInput!) {
                  updateJobsByUserIdAndPeriod(updateJobsData: $updateJobsData) {
                     order
                  }
               }
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
               mutation CreateUser(
                  $describe_name: String!
                  $describe_date: String
                  $describe_specialization: String
                  $describe_position: String
                  $describe_password: String!
                  $CTO: Boolean
               ) {
                  createUser(
                     createUserData: {
                        describe_name: $describe_name
                        describe_date: $describe_date
                        describe_specialization: $describe_specialization
                        describe_position: $describe_position
                        describe_password: $describe_password
                        CTO: $CTO
                     }
                  ) {
                     id
                  }
               }
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
               mutation DeleteUser($id: String!) {
                  deleteUser(id: $id)
               }
            `,
            variables: { id }
         }),
         transformResponse: (response: { deleteUser: IUser['id'] }) => response.deleteUser
      }),

      updatePassword: builder.mutation<boolean, { id: string; newPassword: string }>({
         query: ({ id, newPassword }) => ({
            document: gql`
               mutation UpdatePassword($id: String!, $newPassword: String!) {
                  updatePassword(id: $id, newPassword: $newPassword)
               }
            `,
            variables: { id, newPassword }
         }),
         transformResponse: (response: boolean) => response
      }),

      updateUser: builder.mutation<IUser, { id: string; updateUserData: UpdateUserData }>({
         query: ({ id, updateUserData }) => ({
            document: gql`
               mutation UpdateUser($id: String!, $updateUserData: UpdateUserInput!) {
                  updateUser(id: $id, updateUserData: $updateUserData) {
                     id
                  }
               }
            `,
            variables: {
               id,
               updateUserData
            }
         }),
         transformResponse: (response: { updateUser: IUser }) => response.updateUser
      }),

      login: builder.mutation<{ token: string; id: string }, { username: string; password: string }>({
         query: ({ username, password }) => ({
            document: gql`
               mutation Login($username: String!, $password: String!) {
                  login(loginDto: { username: $username, password: $password }) {
                     token
                     id
                  }
               }
            `,
            variables: {
               username,
               password
            }
         }),
         transformResponse: (response: { login: { token: string; id: string } }) => response.login
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
   useGetCTOQuery
} = api
