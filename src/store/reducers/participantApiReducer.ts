import { participantsResponse } from '@/constants/queryBusiness'
import { Participant, ParticipantTypes } from '@/constants/works'
import { createApi } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { customBaseQuery } from './helpers/baseQuery'

export const participantApi = createApi({
   reducerPath: 'participantApi',
   baseQuery: customBaseQuery,
   tagTypes: ['Participant'],
   endpoints: (builder) => ({
      getParticipantsByType: builder.query<Participant[], { type: ParticipantTypes }>({
         query: ({ type }) => ({
            document: gql`
               query GetParticipantsByType($type: String!) {
                  getParticipantsByType(type: $type) {
                     ${participantsResponse}
                  }
               }
            `,
            variables: { type }
         }),
         transformResponse: (response: { getParticipantsByType: Participant[] }) => response.getParticipantsByType,
         providesTags: (result, error, { type }) =>
            result
               ? [
                    { type: 'Participant' as const, id: 'ALL' },
                    ...result.map(({ id }) => ({ type: 'Participant' as const, id }))
                 ]
               : [{ type: 'Participant' as const, id: 'ALL' }]
      }),

      deleteParticipant: builder.mutation<boolean | null, { type: ParticipantTypes; id: string }>({
         query: ({ type, id }) => ({
            document: gql`
               mutation DeleteParticipant($type: String!, $id: String!) {
                  deleteParticipant(type: $type, id: $id)
               }
            `,
            variables: { type, id }
         }),
         transformResponse: (response: boolean | null) => response,
         invalidatesTags: (result, error, { type }) => [{ type: 'Participant', id: 'ALL' }]
      }),

      createParticipant: builder.mutation<Participant, { type: ParticipantTypes; createParticipantData: Participant }>({
         query: ({ type, createParticipantData }) => ({
            document: gql`
               mutation CreateParticipant($type: String!, $createParticipantData: ParticipantData!) {
                  createParticipant(type: $type, createParticipantData: $createParticipantData) {
                     ${participantsResponse}
                  }
               }
            `,
            variables: { type, createParticipantData }
         }),
         transformResponse: (response: { createParticipant: Participant }) => response.createParticipant,
         invalidatesTags: (result, error, { type }) => [{ type: 'Participant', id: 'ALL' }]
      }),

      updateParticipants: builder.mutation<boolean, { type: ParticipantTypes; updateParticipantsData: Participant[] }>({
         query: ({ type, updateParticipantsData }) => ({
            document: gql`
               mutation UpdateParticipants($type: String!, $updateParticipantsData: [ParticipantData!]!) {
                  updateParticipants(type: $type, updateParticipantsData: $updateParticipantsData)
               }
            `,
            variables: { type, updateParticipantsData }
         }),
         transformResponse: (response: { result: boolean }) => response.result,
         invalidatesTags: (result, error, { type }) => [{ type: 'Participant', id: 'ALL' }]
      })
   })
})

export const {
   useGetParticipantsByTypeQuery,
   useDeleteParticipantMutation,
   useCreateParticipantMutation,
   useUpdateParticipantsMutation,
   util: { invalidateTags }
} = participantApi
