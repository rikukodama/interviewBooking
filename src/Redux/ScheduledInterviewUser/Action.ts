import { ActionTypes } from "./ActionTypes";
import { SchecduledInterviewState } from "./Reducer";
export interface scheduledInterviewSuccess {
    type:ActionTypes.GET_EVENTS_DATA_SUCCESS,
    payload:SchecduledInterviewState
}

export interface scheduledInterviewFailure {
    type:ActionTypes.GET_EVENTS_DATA_FAILURE,
    payload:true
}
export interface scheduledInterviewLoading {
    type:ActionTypes.GET_EVENTS_DATA_REQUEST,
    payload:true
}
export type Action = scheduledInterviewSuccess | scheduledInterviewFailure | scheduledInterviewLoading;