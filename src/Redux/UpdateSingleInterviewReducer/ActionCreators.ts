import { Dispatch } from "redux";
import { ActionTypes } from "./ActionTypes";
import axios from "axios";
import { Action } from "./Action";

export const updateSingleInterview = (interviewId: any,data:any, token: string) => {
    console.log(data,token)
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.UPDATE_SINGLE_INTERVIEW_REQUEST,
            payload: true
        })

        return axios.put<any>(`https://questymeprojectrepo-production.up.railway.app/api/interview/${interviewId}/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch({
                    type: ActionTypes.UPDATE_SINGLE_INTERVIEW_SUCCESS,
                    payload: res.data
                })
                return res;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ActionTypes.UPDATE_SINGLE_INTERVIEW_FAILURE,
                    payload: true
                })
            })
    }
}