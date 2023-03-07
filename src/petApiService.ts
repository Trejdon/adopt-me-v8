/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pet } from "./APIResponsesTypes";

interface RawResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endPoints: (builder) => ({
    getPet: builder.query<Pet, number>({
      query: (id) => ({ url: "pets", params: { id } }),
      transformResponse: (response:  RawResponse) => response.pets[0],
    }),
  }),
});

export const { useGetPetQuery } = petApi;
