import { Action, pastInterviewFailure, pastInterviewLoading, pastInterviewSuccess } from "../../../Redux/PastInterviewReducer/Action";
import { ActionTypes } from "../../../Redux/PastInterviewReducer/ActionTypes";
import { Dispatch } from "redux";
import axios from "axios";

export const getAllPastInterviewService=(userId:number,token:string)=>(dispatch:Dispatch<Action>):Promise<void | ActionTypes>=>{
            return axios.get(`https://questymeprojectrepo-production.up.railway.app/api/interview/${userId}/past-interviews`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then((res)=>{
                dispatch({type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_SUCCESS,payload:res.data})
            })
            .catch((err)=>{
                dispatch({type:ActionTypes.GET_ALL_PAST_EVENTS_DATA_FAILURE,payload:err})
            })
}
