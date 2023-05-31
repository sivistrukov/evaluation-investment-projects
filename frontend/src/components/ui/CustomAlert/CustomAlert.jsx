import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({activeAlert, severity, width, title, content}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true)
    }, [activeAlert]);

    return (
        <>
            <Box sx={{width: width}}>
                <Collapse in={open}>
                    <Alert severity={severity}
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       setOpen(false);
                                   }}
                               >
                                   <CloseIcon fontSize="inherit"/>
                               </IconButton>
                           }
                           sx={{mb: 2}}
                    >
                        <AlertTitle>{title}</AlertTitle>
                        {content}
                    </Alert>
                </Collapse>
            </Box>
        </>
    )
}
export default CustomAlert;