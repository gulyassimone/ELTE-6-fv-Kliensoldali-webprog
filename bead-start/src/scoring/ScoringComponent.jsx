import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ScorePanel} from './ScorePanel';
import {Button, ButtonGroup} from "@mui/material";
import AlertDialog from "../elem/Dialog";
import ErrorList from "../elem/List";
import {CircularProgressWithLabel} from "../elem/CircularProgressWithLabel";


export function ScoringComponent(props) {
    const {criteria, results, onSubmit} = props;
    const [value, setValue] = React.useState(0);
    const [statistic, setStatistic] = useState([]);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    useEffect(() => {
        const requredTab = criteria.tasks?.filter((elem) => elem.aspects.some((x) => x.required)).map((e) => e.name);
        setButtonDisable
        (
            statistic.some((elem) => elem.error.length !== 0) ||
            !requredTab.every((s) => statistic.some((elem) => {
                return s === elem.name && elem.allRequiredFieldFill
            }))
        )

    }, [statistic])
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleNavigateBack = useCallback(() => {
        if (value === 0)
            setValue(criteria.tasks?.length - 1);
        else {
            setValue(value - 1);
        }

    })
    const handleNavigateNext = useCallback(() => {
        console.log(criteria.tasks?.length)
        if (value === criteria.tasks?.length - 1) {
            setValue(0);
        } else {
            setValue(value + 1);
        }
    })
    const handleGetStatistic = (props) => {
        if (statistic.some((elem) => elem.name === props.name)) {
            setStatistic(statistic.map((item) =>
                item.name === props.name
                    ? {
                        name: props.name,
                        acceptedRate: props.acceptedRate,
                        error: props.error,
                        allRateCount: props.allRateCount,
                        allRequiredFieldFill: props.allRequiredFieldFill
                    }
                    : item))
        } else {
            setStatistic(statistic.concat({
                name: props.name,
                acceptedRate: props.acceptedRate,
                error: props.error,
                allRateCount: props.allRateCount
            }));
        }
    }
    const onCancel = () => {
        setShowToolTip(true)
    }
    const onClose = () => {
        setShowToolTip(false);
    }

    return (
        <>
            <Box sx={{width: '100%', bgcolor: 'background.paper', minHeight: 200}}>
                <ErrorList statistic={statistic}/>
            </Box>
            <AlertDialog isOpen={showToolTip} handleClose={onClose} statistic={statistic}/>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <Tabs value={value} onChange={handleChange} centered>
                    {criteria.tasks?.map((elem, i) =>
                        <Tab label={elem.name} key={i}/>
                    )}
                </Tabs>
            </Box>
            <ScorePanel criteriaTab={criteria.tasks?.find((elem, i) => (i === value))} handle={onSubmit}
                        results={results} onSubmit={onSubmit} handleGetStatistic={handleGetStatistic}
                        buttonDisable={buttonDisable} onCancel={onCancel}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            > <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={handleNavigateBack}>Előző</Button>
                <Button onClick={handleNavigateNext}>Következő</Button>
            </ButtonGroup>
            </Box>
        </>
    );
}