import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData } from "../api/stockAPI";
import { AppDispatch, RootState } from "../store/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

const StockGraph: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedStock, duration, stockData, loading } = useSelector(
    (state: RootState) => state.stock
  );

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  // **Polling Mechanism to Fetch Updated Data Every 5-10 seconds**
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!selectedStock || !duration) return;

    const fetchData = () => {
      if (stockData?.status !== "COMPLETE") {
        dispatch(fetchStockData({ stockId: selectedStock, duration }));
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Stop interval when complete
          intervalRef.current = null;
          console.log("Stopped Fetching - Status is COMPLETE");
        }
      }
    };

    fetchData(); // Initial fetch

    if (!intervalRef.current && stockData?.status !== "COMPLETE") {
      intervalRef.current = setInterval(fetchData, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedStock, duration, dispatch, stockData?.status]);

  console.log(stockData);

  // **Graph Data Preparation**
  const chartData = stockData
    ? {
        labels: stockData.data.map((entry) => entry.timestamp),
        datasets: [
          {
            label: "Stock Price",
            data: Object.values(stockData.data).map((entry) => entry.price),
            borderColor: stockData.data[0].price > stockData.data[1]?.price ? "#ff4d4d" : "#00ff99", // Red for fall, Green for rise
            backgroundColor: "rgba(0, 255, 153, 0.2)", // Slight green glow effect
            borderWidth: 2,
            tension: 0.4, // Smooth curve
          },
        ],
      }
    : null;

  // **Update Graph When stockData Changes**
  useEffect(() => {
    const chartCanvas = chartRef.current;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartData && chartCanvas) {
      chartInstanceRef.current = new ChartJS(chartCanvas, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff", // White legend text for dark mode
      },
    },
    tooltip: {
      backgroundColor: "#222", // Dark tooltip background
      titleColor: "#fff",
      bodyColor: "#ddd",
    },
  },
  scales: {
    x: {
      ticks: { color: "#ccc" }, // Lighter X-axis labels
      grid: { color: "#444" }, // Grid color
    },
    y: {
      ticks: { color: "#ccc" }, // Lighter Y-axis labels
      grid: { color: "#444" }, // Grid color
    },
  },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [stockData]);

  return (
    <div style={{ backgroundColor: "#111", padding: "20px", borderRadius: "10px" }}>
    <h2 style={{ color: "#fff" }}>Stock Graph</h2>
    {loading && <p style={{ color: "#fff" }}>Loading...</p>}
    {!loading && stockData && chartData ? (
      <canvas ref={chartRef} style={{ backgroundColor: "#000" }} />
    ) : (
      <p style={{ color: "#fff" }}>Select a stock to view data</p>
    )}
  </div>
  );
};

export default StockGraph;
