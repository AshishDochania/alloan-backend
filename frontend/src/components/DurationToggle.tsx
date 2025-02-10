import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDuration } from "../store/stockSlice";
import { RootState } from "../store/store";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const DurationToggle: React.FC = () => {
  const dispatch = useDispatch();
  const {stocks,duration, selectedStock} = useSelector((state: RootState) => state.stock);

  const [durationArray,setDurationArray]=useState<string[]>([]);

  useEffect(()=>{
    if(selectedStock){
    const stock=stocks.filter((stock)=>stock.id===selectedStock);
    // console.log(stock);
    if(stock){
      setDurationArray(stock[0].available);
    }
  }
  },[selectedStock]);


  const handleChange = (_event: React.MouseEvent<HTMLElement>, newDuration: string | null) => {
    if (newDuration) {
      dispatch(setDuration(newDuration));
    }
  };

  return (
    <ToggleButtonGroup
      value={duration}
      exclusive
      onChange={handleChange}
      aria-label="stock duration"
      
    >
      {durationArray.map((dur)=><ToggleButton value={dur} style={{ color: "#fff",border:"1px solid white" }}>{dur}</ToggleButton>)}
      {/* <ToggleButton value="5y">5y</ToggleButton>
      <ToggleButton value="1y">1y</ToggleButton>
      <ToggleButton value="6m">6M</ToggleButton> */}
    </ToggleButtonGroup>
  );
};

export default DurationToggle;
