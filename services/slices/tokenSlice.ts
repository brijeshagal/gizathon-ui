import { createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";

export type TokenReducer = {
  token: {
    contract: Address;
    chainId: number;
    symbol: string;
    decimals: number;
    name: string;
    coinKey: string;
    logo: string;
    price: number;
    balance?: number;
  };
  por: number;
  srcTokenAmount: string;
  poi: string;
};
const initialState: TokenReducer = {
  token: {
    contract: "0x",
    chainId: 1,
    symbol: "",
    decimals: 18,
    name: "",
    coinKey: "",
    logo: "",
    price: 0,
  },
  srcTokenAmount: "",
  poi: "",
  por: 100,
};

export const token = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPOR: (state, action) => {
      state.por = action.payload;
    },
    setSrcTokenAmount: (state, action) => {
      state.srcTokenAmount = action.payload;
    },
    setPOI: (state, action) => {
      state.poi = action.payload;
    },
  },
});

export const { setToken, setPOI, setPOR, setSrcTokenAmount } = token.actions;

export default token.reducer;
