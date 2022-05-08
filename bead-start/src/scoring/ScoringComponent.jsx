import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ScorePanel} from './ScorePanel';
import {Button, ButtonGroup, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function ScoringComponent(props) {
    const {criteria, results, onSubmit} = props;
    const [value, setValue] = React.useState(0);
    const [statistic, setStatistic] = useState([]);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);

    useEffect(() => {
        setButtonDisable
        (
            statistic.some((elem) => elem.errorCount !== 0) ||
            statistic.some((elem) =>
                elem.acceptedRate.filter((i) => i.required === true).length !==
                criteria.tasks.aspects.filter((i) => i.required === true).length
            ) ||
            statistic.length !== criteria.tasks.length
        );
        console.log(statistic.some((elem) =>
            statistic.some((elem) =>
                elem.acceptedRate.filter((i) => i.required === true).length !==
                criteria.tasks.map((i) => i.required === true).length
            )
        ))
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
        console.log(props)
        if (statistic.some((elem) => elem.name === props.name)) {
            setStatistic(statistic.map((item) =>
                item.name === props.name
                    ? {
                        name: props.name,
                        acceptedRate: props.acceptedRate,
                        error: props.error,
                        allRateCount: props.allRateCount
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
        if (statistic.error) {
            onClose()
        }
    }
    const onClose = () => {
        setShowToolTip(false);
    }
    return (
        <>
            <DialogTitle sx={{m: 0, p: 2}}
                         open={showToolTip}>
                A kitöltés még nincs kész!
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                <Tabs value={value} onChange={handleChange} centered>
                    {criteria.tasks?.map((elem, i) => (
                        <Tab label={elem.name} key={i}/>
                    ))}
                </Tabs>
            </Box>
            <ScorePanel criteriaTab={criteria.tasks?.find((elem, i) => (i === value))} handle={onSubmit}
                        results={results} onSubmit={onSubmit} handleGetStatistic={handleGetStatistic}
                        buttonDisable={buttonDisable} onCancel={onCancel()}/>
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