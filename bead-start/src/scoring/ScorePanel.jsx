import {
    DataGrid,
    MuiEvent, useGridApiRef,
} from '@mui/x-data-grid';
import {MenuItem, Select} from "@mui/material";
import {
    GridCellEditStopParams,
    GridCellEditStopReasons
} from "@mui/x-data-grid";
import {TextField} from "@mui/material";
import {Checkbox} from "@mui/material";
import * as React from 'react';
import {GridRenderCellParams} from "@mui/x-data-grid";
import {GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {CustomEditComponent} from "./RatingEditInputCell";
import {Rating} from "@mui/lab";


export function ScorePanel(elem) {
    const ratings = [{id: 22, rating:3}];

    function renderRating(params: GridRenderCellParams<number>) {
        return <Rating readOnly value={params.value} />;
    }
    const renderRatingEditInputCell: GridColDef['renderCell'] = (params) => {
        return <CustomEditComponent {...params} />;
    };


    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: false,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            editable: true,
            width: 180,
            type: 'number',
            renderCell: renderRating,
            renderEditCell: renderRatingEditInputCell,
        },
        {
            field: 'maxValue',
            headerName: 'Max Value',
            type: 'number',
            width: 110,
            editable: false,
        },
        {
            field: 'required',
            headerName: 'Required',
            type: 'boolean',
            sortable: false,
            width: 160,
        },];
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={elem.elem.aspects}
                columns={columns}
                pageSize={5}
                experimentalFeatures={{newEditingApi: true}}
            />
        </div>
    );
}
