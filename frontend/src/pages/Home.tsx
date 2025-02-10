import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../api/stockAPI";
import { RootState, AppDispatch } from "../store/store";
import StockSelector from "../components/StockSelector";
import StockGraph from "../components/StockGraph";
import DurationToggle from "../components/DurationToggle";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <Container style={{backgroundColor: "#111"}}>
      <Typography variant="h4" gutterBottom style={{ color: "#fff" }}>
        Stock Market Dashboard 📈
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <StockSelector />
      <DurationToggle />
      <StockGraph />
    </Container>
  );
};

export default Home;
