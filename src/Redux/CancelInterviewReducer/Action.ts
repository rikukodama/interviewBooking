import { ActionTypes } from "./ActionTypes";

export interface cancelInterviewRequest {
    type: ActionTypes.CANCEL_SINGLE_INTERVIEW_REQUEST,
    payload: boolean
}

export interface cancelInterviewSuccess {
    type: ActionTypes.CANCEL_SINGLE_INTERVIEW_SUCCESS,
    payload: any
}

export interface cancelInterviewFailure {
    type: ActionTypes.CANCEL_SINGLE_INTERVIEW_FAILURE,
    payload: boolean
}

export type Action = cancelInterviewRequest | cancelInterviewSuccess | cancelInterviewFailure;
