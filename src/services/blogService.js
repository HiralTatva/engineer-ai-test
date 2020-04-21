import request from "../utils/request";

export const getBlogData = (pageNumber) => {
    debugger;
    return request.get(`search_by_date?tags=story&page=${pageNumber}`)
}