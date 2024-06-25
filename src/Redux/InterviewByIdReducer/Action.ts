import { ActionTypes } from "./ActionTypes";

export interface getInterviewRequest {
    type: ActionTypes.GET_SINGLE_INTERVIEW_REQUEST,
    payload: boolean
}

export interface getInterviewSuccess {
    type: ActionTypes.GET_SINGLE_INTERVIEW_SUCCESS,
    payload: any
}

export interface getInterviewFailure {
    type: ActionTypes.GET_SINGLE_INTERVIEW_FAILURE,
    payload: boolean
}

export type Action = getInterviewRequest | getInterviewSuccess | getInterviewFailure;
