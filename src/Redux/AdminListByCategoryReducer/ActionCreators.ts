import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "redux";


export const GetAllAdminListByCategory =(payload:any)=>{
        return (dispatch:Dispatch<Action>)=>{
                dispatch({
                    type:ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_SUCCESS,
                    payload:payload
                })
        }
}