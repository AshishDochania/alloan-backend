import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchStocks,fetchStockData } from "../api/stockAPI";

// Define the structure for stock time series data
interface TimeSeriesEntry {
  price: number;
  change: number;
  change_percent: number;
  volume: number;
}

// Define the structure for stock data
interface timestamps{
    change:number;
    change_percent:number;
    price:number;
    timestamp:string;
    volume:number;
}

interface StockData {
  data:timestamps[];
  status:string;
}

interface StockInfo{
    id:string;
    name:string;
    symbol:string;
    available:string[];
}

// Define the stock state
interface StockState {
  stocks: StockInfo[];
  selectedStock: string | null;
  duration: string | null;
  stockData: StockData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StockState = {
  stocks: [],
  selectedStock: null,
  duration: null,
  stockData: null,
  loading: false,
  error: null,
};

// **Async thunk to fetch stock list**
// export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
//   const response = await axios.get("/api/stocks"); // Adjust API endpoint if needed
//   return response.data;
// });

// // **Async thunk to fetch stock data**
// export const fetchStockData = createAsyncThunk(
//   "stocks/fetchStockData",
//   async ({ stockId, duration }: { stockId: string; duration: string }) => {
//     const response = await axios.post(`/api/stocks/${stockId}`, { duration });
//     return response.data;
//   }
// );

// Create stock slice
const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSelectedStock: (state, action: PayloadAction<string>) => {
      state.selectedStock = action.payload;
      state.duration=null;
      state.stockData = null; // Reset stock data when stock changes
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
      state.stockData = null; // Reset stock data when duration changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stocks";
      })
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload;
        // console.log(state.stockData);
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stock data";
      });
  },
});

// Export actions
export const { setSelectedStock, setDuration } = stockSlice.actions;
export default stockSlice.reducer;
