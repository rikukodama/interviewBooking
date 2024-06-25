import { Dispatch } from "redux";
import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";
import {SchecduledInterviewState} from "../../Redux/ScheduledInterviewUser/Reducer";

export const getInterviewData =(payload:SchecduledInterviewState)=>{
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.GET_EVENTS_DATA_SUCCESS,
            payload:payload
        })
    }
}