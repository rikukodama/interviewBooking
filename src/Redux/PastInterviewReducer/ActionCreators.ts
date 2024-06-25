import { Dispatch } from "redux";
import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";
import { pastInterviewState } from "./Reducer";

export const getPastInterviewData =(payload:pastInterviewState)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_SUCCESS,
            payload:payload
        })
    }
}