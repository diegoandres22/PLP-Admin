import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchRateBcv = async () => {
    const response = await fetch("https://pydolarve.org/api/v1/dollar?page=bcv&monitor=usd");
    if (!response.ok) {
        throw new Error("Error fetching data");
    }
    return await response.json();
};

export const fetchRateBcvData = createAsyncThunk(
    "rateBcv/fetchRateBcvData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchRateBcv();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);