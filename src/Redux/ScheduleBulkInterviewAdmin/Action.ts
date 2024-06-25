import { ActionTypes } from "./ActionTypes";

export interface createBulkInterviewRequest {
    type: ActionTypes.CREATE_BULK_INTERVIEW_REQUEST,
    payload: boolean
}

export interface createBulkInterviewSuccess {
    type: ActionTypes.CREATE_BULK_INTERVIEW_SUCCESS,
    payload: any
}

export interface createBulkInterviewFailure {
    type: ActionTypes.CREATE_BULK_INTERVIEW_FAILURE,
    payload: boolean
}

export type Action = createBulkInterviewRequest | createBulkInterviewSuccess | createBulkInterviewFailure;
