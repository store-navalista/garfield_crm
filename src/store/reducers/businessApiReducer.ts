import {
   getFullMultiBusinessByType,
   getIDMultiBusinessByType,
   getPartAMultiBusinessByType
} from '@/constants/queryBusiness'
import { ALL_WORKS_PROPS, DESIGN_WORK_PROPS, GlobalWorksTypes, Vessel } from '@/constants/works'
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { gql } from 'graphql-request'
import Cookies from 'js-cookie'

type FilterByProps = { type: GlobalWorksTypes; parameter: string; value: string | number }
type updateBusinessWorksProps = { type: GlobalWorksTypes; updateBusinessWorkInput: DESIGN_WORK_PROPS[] }

export const businessApi = createApi({
   reducerPath: 'businessApi',
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
   tagTypes: ['BusinessWork'],
   endpoints: (builder) => ({
      getVessels: builder.query<Vessel[], void>({
         query: () => ({
            document: gql`
               query GetVessels {
                  getVessels {
                     name_of_vessel
                     IMO
                     imo_frozen
                  }
               }
            `
         }),
         transformResponse: (response: { getVessels: Vessel[] }) => response.getVessels
      }),
      deleteVessel: builder.mutation<boolean, { IMO: number }>({
         query: ({ IMO }) => ({
            document: gql`
               query DeleteVessel($IMO: Float!) {
                  deleteVessel(IMO: $IMO)
               }
            `,
            variables: { IMO }
         }),
         transformResponse: (response: boolean) => response
      }),
      createVessel: builder.mutation<Vessel, Vessel>({
         query: (createVesselData) => ({
            document: gql`
               mutation CreateVessel($createVesselData: UpdateVesselInput!) {
                  createVessel(createVesselData: $createVesselData) {
                     name_of_vessel
                     IMO
                     imo_frozen
                  }
               }
            `,
            variables: { createVesselData }
         }),
         transformResponse: (response: { createVessel: Vessel }) => response.createVessel
      }),
      updateVessels: builder.mutation<Vessel[], Vessel[]>({
         query: (updateVesselsData) => ({
            document: gql`
               mutation UpdateVessels($updateVesselsData: [UpdateVesselInput!]!) {
                  updateVessels(updateVesselsData: $updateVesselsData) {
                     name_of_vessel
                     IMO
                     imo_frozen
                  }
               }
            `,
            variables: { updateVesselsData }
         }),
         transformResponse: (response: { createVessel: Vessel[] }) => response.createVessel
      }),
      getAllBusinessWorkByType: builder.query<DESIGN_WORK_PROPS[], GlobalWorksTypes>({
         query: (type) => ({
            document: gql`
               query GetAllBusinessWorkByType($type: String!) {
                  getAllBusinessWorkByType(type: $type) {
                     ${getFullMultiBusinessByType}
                  }
               }
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
   useGetVesselsQuery,
   useUpdateVesselsMutation,
   useDeleteVesselMutation,
   useCreateVesselMutation,
   useGetAllBusinessWorkByTypeQuery,
   useDeleteWorkByTypeAndIdMutation,
   useCreateBusinessWorkMutation,
   useUpdateBusinessWorksMutation,
   useGetBusinessWorksNumbersQuery,
   useFilterByMutation,
   useGetAllWorksQuery,
   util: { invalidateTags }
} = businessApi
