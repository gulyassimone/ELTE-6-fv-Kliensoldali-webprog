import * as React from "react";
import {  MenuItem, Select} from "@mui/material";
import { useEffect, useState } from "react";

export function StatusEditInputCell(props) {
  const { handlePassData, id, value} = props;
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if(value){
      setStatus(value)
    }
  },[value])
  const handleChange = (event) => {
    setStatus(event.target.value);
    handlePassData(id, event.target.value);
  };

  return <>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={status}
      onChange={handleChange}
    >
      <MenuItem value={"published"}> Published </MenuItem>
      <MenuItem value={"draft"}> Draft </MenuItem>
    </Select>
  </>;
}
