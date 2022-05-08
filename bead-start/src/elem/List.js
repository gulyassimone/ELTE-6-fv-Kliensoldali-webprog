import * as React from 'react';
import {useEffect} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

export default function ErrorList(props) {
    const [dialogStatistic, setDialogStatistic] = React.useState([]);
    const {statistic} = props;
    const [listOpen, setListOpen] = React.useState(true);

    const handleClick = () => {
        setListOpen(!listOpen);
    };

    useEffect(() => {
        setDialogStatistic([].concat(...statistic));
    }, [statistic])
    return (
        <List>
            {dialogStatistic?.map((elem, l) => {
                return <>
                    <ListItemButton onClick={handleClick} key={"ListItemButton " + l} sx={{
                        pl: 4,
                        color: (elem.error.length === 0 && elem.allRequiredFieldFill) ? "#00FF00" : "#FF0000"
                    }}>
                        {`${elem.name} ${elem.allRequiredFieldFill ? "" : "(Nincs kitöltve az összes kötelező mező)"}`}
                    </ListItemButton>
                    <Collapse in={listOpen} timeout="auto" unmountOnExit key={"Collapse " + l}>
                        <List component="div" disablePadding key={"List " + l}>
                            {elem.error.map((x, k) =>
                                <ListItem sx={{pl: 4, color: "#FF0000"}} key={"ListItem " + l + k}>
                                    <ListItemIcon key={"ListItemIcon " + l + k}>
                                        <ClearIcon key={"ClearIcon " + l + k}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={x.id + ". feladatnál az alábbi hibaüzenetet kaptam: " + x.text}
                                        key={"ListItemText " + l + k}/>
                                </ListItem>
                            )}
                        </List>
                    </Collapse>
                </>
            })}

            <ListItem disablePadding>

            </ListItem>
        </List>

    );
}
