import { Dispatch } from "redux";
import {Action} from "./Action";
import { ActionTypes } from "./ActionTypes";
import { IsAuthstate } from "./Reducer";

export const isAuthenticated =(payload:IsAuthstate)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.LOGIN_SUCCESS,
            payload:payload
        })

    }
}