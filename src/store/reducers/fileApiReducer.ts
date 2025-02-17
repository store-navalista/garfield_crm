import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { customBaseQuery } from './helpers/baseQuery'

interface FileResponse {
   fileName: string
   size: number
   buffer: string
}

export const fileApi = createApi({
   reducerPath: 'fileApi',
   baseQuery: customBaseQuery,
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
