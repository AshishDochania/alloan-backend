import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3000/api/stocks";

// Define response types
type StockDataPoint = {
  timestamp: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
};

type ApiResponse = {
  data: StockDataPoint[];
  status: "STARTING" | "IN_PROGRESS" | "COMPLETE";
};

// Fetch available stocks list
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }
  return await response.json();
});

// Fetch stock data dynamically (with retries)
export const fetchStockData = createAsyncThunk(
  "stocks/fetchStockData",
  async ({ stockId, duration }: { stockId: string; duration: string }) => {
    let retries = 0;
    while (retries < 3) {
      const response = await fetch(`${API_BASE_URL}/${stockId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        if (Array.isArray(data.data) && data.data.length > 0) {
          return data; // Return valid response
        }
      }

      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Retry after 1 sec
    }
    throw new Error("Failed to fetch stock data after 3 retries");
  }
);
