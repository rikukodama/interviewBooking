import { ActionTypes } from "./ActionTypes";

export interface createInterviewRequest {
    type: ActionTypes.CREATE_SINGLE_INTERVIEW_REQUEST,
    payload: boolean
}

export interface createInterviewSuccess {
    type: ActionTypes.CREATE_SINGLE_INTERVIEW_SUCCESS,
    payload: any
}

export interface createInterviewFailure {
    type: ActionTypes.CREATE_SINGLE_INTERVIEW_FAILURE,
    payload: boolean
}

export type Action = createInterviewRequest | createInterviewSuccess | createInterviewFailure;
