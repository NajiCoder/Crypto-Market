import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "9521e62518msh5eb43d2db92f121p16533cjsnce19b0fe9b1a",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/coins";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/coins"),
    }),
    // getCryptoDetails: builder.query({
    //     query: (coinId) => createRequest(`/coin/${coinId}`),
    // }),
    // getCryptoHistory: builder.query({
    //     query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history/${timeperiod}`),
    // }),
    // getExchanges: builder.query({
    //   query: () => createRequest(`/exchanges`),
    // }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
