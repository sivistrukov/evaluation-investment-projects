import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDialogWindow({maxWidth, fullWidth, open, content, dialogTitle, title, handleClose, fullScreen = false}) {

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                {dialogTitle}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {title}
                </DialogContentText>
                {content}
            </DialogContent>
        </Dialog>
    );
}