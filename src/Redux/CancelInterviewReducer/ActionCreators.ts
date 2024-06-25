import { Dispatch } from "redux";
import { ActionTypes } from "./ActionTypes";
import axios from "axios";
import { Action } from "./Action";

export const cancelSingleInterview = (interviewId: any,token:string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.CANCEL_SINGLE_INTERVIEW_REQUEST,
            payload: true
        })
        return axios.put<any>(`https://questymeprojectrepo-production.up.railway.app/api/interview/${interviewId}/cancel`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
                dispatch({
                    type: ActionTypes.CANCEL_SINGLE_INTERVIEW_SUCCESS,
                    payload: res.data
                })
                return res;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ActionTypes.CANCEL_SINGLE_INTERVIEW_FAILURE,
                    payload: true
                })
            })
    }
}