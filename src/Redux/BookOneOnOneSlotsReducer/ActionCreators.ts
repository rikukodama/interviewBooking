import { Action, bookOneOnOneDataSuccess } from "./Action";
import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "redux";
interface temp {
    rad:string
}
export const getBookOneOnOneData = (payload:temp)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({type:ActionTypes.GET_ADMIN_TYPE_LIST_SUCCESS,payload:payload})

    }
}
