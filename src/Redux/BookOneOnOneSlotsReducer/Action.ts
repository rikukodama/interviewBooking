import { ActionTypes } from "./ActionTypes";
interface temp {
    rad:string
}
export interface bookOneOnOneDataSuccess{
    type:ActionTypes.GET_ADMIN_TYPE_LIST_SUCCESS,
    payload:temp
}

export interface bookOneOnOneDataFailure{
    type:ActionTypes.GET_ADMIN_TYPE_LIST_FAILURE,
    payload:true
}

export interface bookOneOnOneDataLoading{
    type:ActionTypes.GET_ADMIN_TYPE_LIST_REQUEST,
    payload:true
}

export type Action = bookOneOnOneDataSuccess | bookOneOnOneDataFailure|bookOneOnOneDataLoading;