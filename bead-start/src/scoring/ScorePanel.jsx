import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams} from '@mui/x-data-grid';

import {RatingEditInputCell} from "./RatingEditInputCell";
import {Button, ButtonGroup, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";


const StyledBox = styled(Box)(() => ({
    height: 400,
    width: '100%',
    '& .error': {
        backgroundColor: `rgb(126, 10, 15, 0.1)`,
        color: '#750f0f',
    },
    '& .required': {
        backgroundColor: '#E0FFFD',
    },
    '& .notRequired': {
        backgroundColor: '#00000',
    },
}));


export function ScorePanel(props) {
    const {criteriaTab, onSubmit, onCancel, results, handleGetStatistic, buttonDisable} = props;
    const [actualRating, setActualRating] = useState([])
    const [rowError, setRowError] = useState([]);

    useEffect(() => {
        setActualRating(results)
    }, [results])

    //set error
    useEffect(() => {
        //error handling
        const listOfErrors = actualRating.filter(
            (elem) => elem.maxValue && (elem.maxValue < elem.rate || 0 > elem.rate)
        )
        setRowError(listOfErrors.map((elem) => {
            return {id: elem.id, text: `A jegynek a 0 és ${elem.maxValue}  között kell lennie`}
        }))

    }, [actualRating])
    //Save button change
    useEffect(() => {
            //statistic
            //actual error
            const error = rowError.filter(
                (elem) => criteriaTab.aspects.some(allItem => elem.id === allItem.id)
            );
            //accepted rate
            const acceptedRate = actualRating.filter(
                (elem) => criteriaTab.aspects.some(allItem => elem.id === allItem.id)
            );
            //allRequiredFieldFill
            const allRequiredFieldFill = criteriaTab.aspects.every(
                (allItem) => !allItem.required || actualRating.some(elem => elem.id === allItem.id)
            )

            //all rate
            const allRateCount = criteriaTab.aspects.length;

            handleGetStatistic({
                name: criteriaTab.name,
                acceptedRate: acceptedRate,
                error: error,
                allRateCount: allRateCount,
                allRequiredFieldFill: allRequiredFieldFill
            })
        }

        ,
        [actualRating, rowError]
    )

    const handlePassData = (id: number, newValue: number) => {
        const maxValue = criteriaTab.aspects.find((elem) => elem.id === id)?.maxValue;
        if (actualRating.find((elem) => elem.id === id)) {
            setActualRating(actualRating.map((item) =>
                item.id === id
                    ? {id: id, rate: newValue, maxValue: maxValue}
                    : item));
        } else {
            setActualRating([...actualRating, {id: id, rate: newValue, maxValue: maxValue}]);
        }

    }


    function renderRating(params: GridRenderCellParams<number>) {
        return <TextField readOnly value={params.value === undefined ? "?" : String(params.value)}/>;
    }

    const renderRatingEditInputCell: GridColDef['renderCell'] = (params) => {
        const {id, row} = params;
        const rate = actualRating.find((elem) => elem.id === params.row.id)?.rate;
        return <>
            <RatingEditInputCell handlePassData={handlePassData} id={id} value={rate} row={row}/>
        </>;
    };


    const columns: GridColDef[] = [
            {field: 'id', headerName: '#', width: 90},
            {
                field: 'name',
                headerName: 'Elnevezés',
                width: 150,
                editable: false,
            },
            {
                field: 'description',
                headerName: 'Leirás',
                width: 250,
                editable: false,
            },
            {
                field: 'actualValue',
                headerName: 'Aktuális érték',
                type: 'string',
                width: 110,
                editable: true,
                renderCell: renderRating,
                renderEditCell: renderRatingEditInputCell,
                valueGetter: (params: GridValueGetterParams) => {
                    return actualRating.find((elem) => elem.id === params.row.id)?.rate;
                },
            },
            {
                field: 'maxValue',
                headerName: 'Max érték',
                type: 'number',
                width: 110,
                editable: false,
            },
            {
                field: 'required',
                headerName: 'Kötelező',
                type: 'boolean',
                width: 110,
                editable: false,
            },
            {
                field: 'error',
                headerName: '',
                type: 'string',
                width: 300,
                editable: false,
                valueGetter: (params: GridValueGetterParams) => {
                    return rowError.find((elem) => elem.id === params.row.id)?.text;
                },
            },
        ]
    ;
    return (
        <StyledBox>
            <DataGrid
                rows={criteriaTab.aspects}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{newEditingApi: true}}
                getRowClassName={(params) => {
                    if (rowError.find((elem) => elem.id === params.row.id))
                        return 'error'
                    else if (params.row.required)
                        return 'required'
                    else
                        return 'notRequired'
                }}
            />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" color="success"
                        disabled={buttonDisable}
                        onClick={() => {
                            onSubmit(actualRating)
                        }}> Mentés</Button>
                <Button variant="contained" color="error" onClick={() => {
                    onSubmit(actualRating);
                    onCancel()
                }}> Elvetés</Button>
            </ButtonGroup>
        </StyledBox>
    );
}
