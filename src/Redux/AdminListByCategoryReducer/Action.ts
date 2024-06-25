import { ActionTypes } from "./ActionTypes";

export interface adminListByCategorySuccess{
    type:ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_SUCCESS,
    payload:any
}

export interface adminListByCategoryLoading{
    type:ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_REQUEST,
    payload:true
}

export interface adminListByCategoryFailure{
    type:ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_FAILURE,
    payload:true
}

export type Action = adminListByCategoryLoading |adminListByCategorySuccess|adminListByCategoryFailure ;