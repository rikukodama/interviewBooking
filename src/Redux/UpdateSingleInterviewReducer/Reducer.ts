import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";

export interface interview {
    interview: any,
    isLoading: boolean,
    isError: boolean
}

const initialState: interview = {
    interview: [],
    isLoading: false,
    isError: false
};

export const reducer = (state = initialState, action: Action): any => {
    switch (action.type) {
        case ActionTypes.UPDATE_SINGLE_INTERVIEW_REQUEST:
            return {
                ...state,
                isLoading: action.payload,
                isError: false
            }

        case ActionTypes.UPDATE_SINGLE_INTERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                interview: action.payload,
                isError: false
            }

        case ActionTypes.UPDATE_SINGLE_INTERVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: action.payload
            }
        default:
            return state
    }
}