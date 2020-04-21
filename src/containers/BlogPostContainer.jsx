import React, { Component } from 'react'
import { constants } from "../utils/constants";
import {
    Box,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    withStyles,
    TablePagination,
    TextField
} from "@material-ui/core";
import BlogDetailsDialogComponent from "../components/BlogDetailsDialogComponent";
import { getBlogData } from '../services/blogService';
const styles = (theme) => ({
    table: {
        minWidth: 650
    }
});

export class BlogPostContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiPageNumber: 0,

            blogPostData: [],

            selectedBlog: {
                open: false,
                blogDetails: null
            },
            page: 0,
            rowsPerPage: 10,
            searchFieldData: null
        }
        this.BaseURl = constants.REACT_APP_BASE_URL;
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => { this.LoadBlogPostData() }, constants.API_TIMER)
        this.LoadBlogPostData()
    }

    LoadBlogPostData() {
        //request.get(`search_by_date?tags=story&page=${this.state.apiPageNumber}`)
        getBlogData(this.state.apiPageNumber)
            .then(res => {
                const blogPopstData = res.data;
                this.setState(
                    {
                        blogPostData: [...this.state.blogPostData, ...blogPopstData.hits],
                        apiPageNumber: this.state.apiPageNumber + 1
                    });
            })
    }

    // View More Data Click Handler
    viewMoreHandleClick = (e, blogData) => {
        this.setState({
            selectedBlog: {
                open: true,
                blogDetails: blogData
            }
        })
    }

    //On Close Dialog Reset State
    onCloseDialog = () => {
        this.setState({
            selectedBlog: {
                open: false,
                blogDetails: null
            }
        })
    }

    // On Page Change Handler
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    //On Row Per Page Handler
    handleChangeRowsPerPage = (event) => {
        this.setState({ page: 0, rowsPerPage: event.target.value })
    };

    /// Handle change filter
    handleChangeFilter = (e) => {
        this.setState({ searchFieldData: e.target.value })
    }

    componentWillUnmount() {
        //clearinterval on component unmount
        clearInterval(this.interval);
    }

    render() {
        let blogPostFilteredData = [...this.state.blogPostData];

        if (this.state.searchFieldData) {
            blogPostFilteredData = blogPostFilteredData.filter((post) => {
                return post.title.includes(this.state.searchFieldData) ||
                    post.url.includes(this.state.searchFieldData) ||
                    post.author.includes(this.state.searchFieldData)
            })
        }
        return (
            <Box m={4}>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Search" variant="outlined" onChange={this.handleChangeFilter} />
                </form>
                {blogPostFilteredData.length > 0 ?
                    (
                        <>
                            <TableContainer component={Paper}>
                                <Table aria-label="Blog Post">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>URL</TableCell>
                                            <TableCell>created Date</TableCell>
                                            <TableCell>Author</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {blogPostFilteredData
                                            .splice(this.state.page * this.state.rowsPerPage, this.state.rowsPerPage)
                                            .map((blogPost, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {blogPost.title}
                                                    </TableCell>
                                                    <TableCell>{blogPost.url}</TableCell>
                                                    <TableCell>{blogPost.created_at}</TableCell>
                                                    <TableCell>{blogPost.author}</TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" color="secondary"
                                                            onClick={(e) => this.viewMoreHandleClick(e, blogPost)}>
                                                            View
                                            </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {!this.state.searchFieldData && <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={this.state.blogPostData.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />}
                        </>)
                    : (<>No Record Found</>)}
                <BlogDetailsDialogComponent blogData={this.state.selectedBlog}
                    onCloseDialog={this.onCloseDialog} />
            </Box>
        )
    }
}

export default withStyles(styles)(BlogPostContainer)
