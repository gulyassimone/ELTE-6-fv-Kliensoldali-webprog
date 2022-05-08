import * as React from "react";
import {InputLabel, MenuItem, Select, Switch, TextField} from "@mui/material";
import {useEffect, useRef, useState} from "react";

export function RatingEditInputCell(props) {
    const {handlePassData, id, value, row} = props;
    const [rate, setRate] = useState(value | 0);

    const handleChange = (event) => {
        if(row.type==="boolean"){
            const newRate = event.target.checked?1:0;
            setRate(newRate);
            handlePassData(id, newRate);
        }else{
            setRate(event.target.value);
            handlePassData(id, parseInt(event.target.value));
        }
    };

    if (row.type === "number") {
        return (
            <TextField
                id="outlined-number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={rate}
                onChange={handleChange}
            />
        );
    } else if (row.type === "list") {
        return <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rate}
                onChange={handleChange}
            >
                {Object.keys(row.values).map(key => {
                    return <MenuItem value={row.values[key]} key={key}> {key}</MenuItem>
                })}
            </Select>
        </>
    } else if (row.type === "boolean") {
        return <>
            <Switch inputProps={{'aria-label': 'Switch A'}} checked={rate===1?true:false} onChange={handleChange}/>
        </>
    }
}