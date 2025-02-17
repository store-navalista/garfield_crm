import { GraphQLClient } from 'graphql-request'
import { backend } from './backend'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const memoryToken = { access_token: '' }

export const setAuthToken = (token: string) => {
   memoryToken.access_token = token
}

export const customBaseQuery: BaseQueryFn<{ document: string; variables?: Record<string, any> }> = async (args) => {
   const client = new GraphQLClient(backend, {
      credentials: 'include',
      headers: {
         authorization: memoryToken.access_token ? `Bearer ${memoryToken.access_token}` : ''
      }
   })

   try {
      const data = await client.request(args.document, args.variables)
      return { data }
   } catch (error) {
      return { error }
   }
}
