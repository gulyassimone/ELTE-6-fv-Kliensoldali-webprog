import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ScorePanel} from './ScorePanel';

export function ScoringComponent({criteria, onSubmit, onCancel}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {criteria.tasks.map((elem, i) => (<Tab label={elem.name} key={i} />))}
                </Tabs>
            </Box>
            <ScorePanel elem={criteria.tasks.find((elem, i) => (i === value))}/>
        </>
    );
}