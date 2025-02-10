import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setSelectedStock } from "../store/stockSlice"
import { fetchStocks } from "../api/stockAPI";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent  } from "@mui/material";

const StockSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, selectedStock } = useSelector((state: RootState) => state.stock);

  // Fetch stock list on component mount
  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  const handleStockChange = (event: SelectChangeEvent) => {  
    dispatch(setSelectedStock(event.target.value as string));
  };

  console.log(stocks);

  return (
    <FormControl  fullWidth >
      <InputLabel style={{ color: "#fff"}}>Select Stock</InputLabel>
      <Select value={selectedStock || ""} onChange={handleStockChange} style={{ color: "#fff",border:"1px solid white"  }}>
        {stocks.map((stock) => (
          <MenuItem key={stock.id} value={stock.id} >
            {stock.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StockSelector;
