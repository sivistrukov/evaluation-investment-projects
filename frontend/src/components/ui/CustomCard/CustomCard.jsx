import React from 'react';
import {Button, Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

function CustomCard({title, content, buttons, minWidth = 400, key}) {
    return (
        <Card key={key} sx={{ minWidth: minWidth }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                {buttons}
            </CardActions>
        </Card>
    );
}

export default CustomCard;