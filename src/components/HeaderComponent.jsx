import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

const HeaderComponent = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Blog Posts
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent
