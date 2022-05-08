import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ErrorList from "./List";

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    const {isOpen, handleClose, statistic} = props;

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"A kitöltés nem lett befejezve!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ErrorList statistic={statistic}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
