import { ActionTypes } from "./ActionTypes";
import { pastInterviewState } from "./Reducer";
export interface pastInterviewSuccess {
    type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_SUCCESS,
    payload:pastInterviewState
}

export interface pastInterviewFailure {
    type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_FAILURE,
    payload:true
}
export interface pastInterviewLoading {
    type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_REQUEST,
    payload:true
}
export type Action = pastInterviewSuccess | pastInterviewFailure | pastInterviewLoading;