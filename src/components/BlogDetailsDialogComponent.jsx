import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Paper,
    makeStyles,
    Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        noWrap: true
    },
}));

const BlogDetailsDialogComponent = ({ blogData, onCloseDialog }) => {
    const classes = useStyles();

    return (
        <Dialog onClose={onCloseDialog} aria-labelledby="customized-dialog-title" open={blogData.open}>
            <DialogTitle id="customized-dialog-title" onClose={onCloseDialog}>
                Blog Details
            </DialogTitle>
            {blogData.blogDetails && <DialogContent dividers>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Typography >Title:</ Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>{blogData.blogDetails.title}</Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography >URL:</ Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>{blogData.blogDetails.url}</Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography >Author:</ Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>{blogData.blogDetails.author}</Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography >Date:</ Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>{blogData.blogDetails.created_at}</Paper>
                        </Grid>
                    </Grid>
                </div>`
            </DialogContent>}
        </Dialog>
    )
}

BlogDetailsDialogComponent.prototype = {
    blogData: PropTypes.object.isRequired,
    onCloseDialog: PropTypes.func.isRequired
}

export default BlogDetailsDialogComponent
