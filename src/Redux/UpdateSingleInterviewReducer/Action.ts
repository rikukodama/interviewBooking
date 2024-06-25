import { ActionTypes } from "./ActionTypes";

export interface updateInterviewRequest {
    type: ActionTypes.UPDATE_SINGLE_INTERVIEW_REQUEST,
    payload: boolean
}

export interface updateInterviewSuccess {
    type: ActionTypes.UPDATE_SINGLE_INTERVIEW_SUCCESS,
    payload: any
}

export interface updateInterviewFailure {
    type: ActionTypes.UPDATE_SINGLE_INTERVIEW_FAILURE,
    payload: boolean
}

export type Action = updateInterviewRequest | updateInterviewSuccess | updateInterviewFailure;
