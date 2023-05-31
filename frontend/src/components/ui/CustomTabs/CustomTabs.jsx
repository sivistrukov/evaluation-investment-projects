import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomTabPanel from './Items/CustomTabPanel'

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        marginTop: 20,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function CustomVerticalTabs({listTabs = []}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
            >
                {
                    listTabs.length !== 0 &&
                    listTabs?.map((item, index) =>
                        <Tab key={index} label={item.label} {...a11yProps(index)} />
                    )
                }
            </Tabs>
            {
                listTabs.length !== 0 &&
                listTabs?.map((item, index) =>
                    <CustomTabPanel key={index} value={value} index={index}>
                        {item.content}
                    </CustomTabPanel>
                )
            }
        </div>
    );
}