import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "redux";



export const getAllCategories =(payload:any)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({type:ActionTypes.GET_CATEGORY_SUCCESS,payload:payload})

    }

}