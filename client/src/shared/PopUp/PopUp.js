import React from 'react';

import Draggable from 'react-draggable';

//Material UI Components
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';

//Material UI Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    // root: {
    //     ".MuiDialogContent-root": {
    //         padding: "0px 24px 8px 24px !important"
    //     },
    //     "& .MuiDialog-paperWidthLg": {
    //         maxWidth: "none !important"
    //     },
    //     "& .MuiDialog-paper": {
    //         margin: 0
    //     },
    //     "& .MuiDialogTitle-root": {
    //         padding: "4px !important"
    //     }
    // },
    content: {
        "&:first-child": {
            paddingTop: "12px"
        }
    },
});


export default function PopUp(props) {

    const { children, openPopup, setOpenPopup, fullScreen, disableBackdropClick, hideBackdrop, disableEnforceFocus } = props;
    const classes = useStyles();

    const handleClose = () => {
        setOpenPopup(false);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={openPopup}
            maxWidth="lg"
        >
            <DialogContent className={classes.content}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
