import { ActionTypes } from "./ActionTypes";


export interface categoryDataSuccess{
    type:ActionTypes.GET_CATEGORY_SUCCESS,
    payload:any
}

export interface categoryDataLoading{
    type:ActionTypes.GET_CATEGORY_REQUEST,
    payload:true
}

export interface categoryDataFailure{
    type:ActionTypes.GET_CATEGORY_FAILURE,
    payload:true
}

export type Action = categoryDataSuccess | categoryDataLoading | categoryDataFailure;

