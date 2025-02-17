import {
   getFullMultiBusinessByType,
   getIDMultiBusinessByType,
   getPartAMultiBusinessByType
} from '@/constants/queryBusiness'
import { ALL_WORKS_PROPS, DESIGN_WORK_PROPS, GlobalWorksTypes } from '@/constants/works'
import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { customBaseQuery } from './helpers/baseQuery'
import { businessApiRequests } from './helpers/businessApiRequests'

type FilterByProps = { type: GlobalWorksTypes; parameter: string; value: string | number }
type updateBusinessWorksProps = { type: GlobalWorksTypes; updateBusinessWorkInput: DESIGN_WORK_PROPS[] }

export const businessApi = createApi({
   reducerPath: 'businessApi',
   baseQuery: customBaseQuery,
   tagTypes: ['BusinessWork'],
   endpoints: (builder) => ({
      getAllBusinessWorkByType: builder.query<DESIGN_WORK_PROPS[], GlobalWorksTypes>({
         query: (type) => ({
            document: gql`
               ${businessApiRequests.getAllBusinessWorkByTypeRequest}
            `,
            variables: { type }
         }),
         transformResponse: (response: { getAllBusinessWorkByType: DESIGN_WORK_PROPS[] }) =>
            response.getAllBusinessWorkByType,
         providesTags: (result, error, type) =>
            result ? [{ type: 'BusinessWork', id: type }] : [{ type: 'BusinessWork' }]
      }),
      updateBusinessWorks: builder.mutation<DESIGN_WORK_PROPS[], updateBusinessWorksProps>({
         query: ({ type, updateBusinessWorkInput }) => ({
            document: gql`
               mutation UpdateBusinessWorks($type: String!, $updateBusinessWorkInput: [UpdateBusinessWorkInput!]!) {
                  updateBusinessWorks(type: $type, updateBusinessWorkInput: $updateBusinessWorkInput) {
                     ${getIDMultiBusinessByType}
                  }
               }
            `,
            variables: { type, updateBusinessWorkInput }
         }),
         transformResponse: (response: { updateBusinessWork: DESIGN_WORK_PROPS[] }) => response.updateBusinessWork,
         invalidatesTags: (result, error, { type }) => [{ type: 'BusinessWork', id: type }]
      }),
      getBusinessWorksNumbers: builder.query<number[], { type: GlobalWorksTypes }>({
         query: ({ type }) => ({
            document: gql`
               query GetBusinessWorksNumbers($type: String!) {
                  getBusinessWorksNumbers(type: $type)
               }
            `,
            variables: { type }
         }),
         transformResponse: (response: { getBusinessWorksNumbers: number[] }) => response.getBusinessWorksNumbers
      }),
      deleteWorkByTypeAndId: builder.mutation<boolean, { type: string; id: string }>({
         query: ({ type, id }) => ({
            document: gql`
               mutation DeleteWorkByTypeAndId($type: String!, $id: String!) {
                  deleteWorkByTypeAndId(type: $type, id: $id)
               }
            `,
            variables: { type, id }
         }),
         transformResponse: (response: { deleteWorkByTypeAndId: boolean }) => response.deleteWorkByTypeAndId,
         invalidatesTags: (result, error, { type }) => [{ type: 'BusinessWork', id: type }]
      }),
      createBusinessWork: builder.mutation<DESIGN_WORK_PROPS, string>({
         query: (type) => ({
            document: gql`
               mutation CreateBusinessWork($type: String!) {
                  createBusinessWork(type: $type) {
                     ${getIDMultiBusinessByType}
                  }
               }
            `,
            variables: { type }
         }),
         transformResponse: (response: { createBusinessWork: DESIGN_WORK_PROPS }) => response.createBusinessWork,
         invalidatesTags: (result, error, type) => [{ type: 'BusinessWork', id: type }]
      }),
      filterBy: builder.mutation<DESIGN_WORK_PROPS[], FilterByProps>({
         query: ({ type, parameter, value }) => ({
            document: gql`
               mutation GetBusinessWorksByParameter($type: String!, $parameter: String!, $value: String!) {
                  getBusinessWorksByParameter(type: $type, parameter: $parameter, value: $value) {
                     ${getFullMultiBusinessByType}
                  }
               }
            `,
            variables: { type, parameter, value }
         }),
         transformResponse: (response: { getBusinessWorksByParameter: DESIGN_WORK_PROPS[] }) =>
            response.getBusinessWorksByParameter
      }),
      getAllWorks: builder.query<ALL_WORKS_PROPS, void>({
         query: () => ({
            document: gql`
               query GetAllBusinessWorkAllTypes {
                  getAllBusinessWorkAllTypes {
                     ${getPartAMultiBusinessByType}
                  }
               }
            `
         }),
         transformResponse: (response: { getAllBusinessWorkAllTypes: ALL_WORKS_PROPS }) =>
            response.getAllBusinessWorkAllTypes,
         providesTags: (result) =>
            result ? [{ type: 'BusinessWork', id: 'ALL' }] : [{ type: 'BusinessWork', id: 'ALL' }]
      })
   })
})

export const {
   useGetAllBusinessWorkByTypeQuery,
   useDeleteWorkByTypeAndIdMutation,
   useCreateBusinessWorkMutation,
   useUpdateBusinessWorksMutation,
   useGetBusinessWorksNumbersQuery,
   useFilterByMutation,
   useGetAllWorksQuery,
   util: { invalidateTags }
} = businessApi
