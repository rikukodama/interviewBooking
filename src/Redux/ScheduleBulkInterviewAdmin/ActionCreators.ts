import { Dispatch } from "redux";
import { ActionTypes } from "./ActionTypes";
import axios from "axios";
import { Action } from "./Action";

export const createBulkInterview = (data: any,token:string) => {
    return (dispatch: Dispatch<Action>) => {
        console.log("shivam");
        dispatch({
            type: ActionTypes.CREATE_BULK_INTERVIEW_REQUEST,
            payload: true
        })
        return axios.post<any>("https://questymeprojectrepo-production.up.railway.app/api/interview/csv/create", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res);
                dispatch({
                    type: ActionTypes.CREATE_BULK_INTERVIEW_SUCCESS,
                    payload: res
                })
                return res;
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ActionTypes.CREATE_BULK_INTERVIEW_FAILURE,
                    payload: true
                })
            })
    }
}