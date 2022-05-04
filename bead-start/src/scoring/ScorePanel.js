import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export function ScorePanel(elem){
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
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
            field: 'actualValue',
            headerName: 'Actual Value',
            type: 'number',
            width: 110,
            editable: true,
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
        },
    ];
    console.log(elem.elem)
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={elem.elem.aspects}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
