import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'
import Cookies from 'js-cookie'

interface FileResponse {
   fileName: string
   size: number
   buffer: string
}

export const fileApi = createApi({
   reducerPath: 'fileApi',
   baseQuery: graphqlRequestBaseQuery({
      url: '/graphql',
      // url: 'http://localhost:8877/graphql',
      prepareHeaders: (headers) => {
         const token = Cookies.get('token')

         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }

         return headers
      }
   }),
   endpoints: (builder) => ({
      getFile: builder.query<FileResponse, { fileName: string; filePath: string }>({
         query: ({ fileName, filePath }) => ({
            document: gql`
               query GetFile($fileName: String!, $filePath: String!) {
                  getFile(fileName: $fileName, filePath: $filePath) {
                     fileName
                     size
                     buffer
                  }
               }
            `,
            variables: { fileName, filePath }
         }),
         transformResponse: (response: { getFile: FileResponse }) => response.getFile
      }),
      backupDB: builder.mutation<void, void>({
         query: () => ({
            document: gql`
               mutation BackupDB {
                  backupDB
               }
            `
         }),
         transformResponse: (response: { backupDB: void }) => response.backupDB
      })
   })
})

export const { useGetFileQuery, useBackupDBMutation } = fileApi
