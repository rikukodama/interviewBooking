import {
  scheduledInterviewFailure,
  scheduledInterviewLoading,
  scheduledInterviewSuccess,
} from "@/Redux/ScheduledInterviewUser/Action";
import { interview } from "../../../Pages/UserDashboard/UserDashboard";
import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../../Redux/ScheduledInterviewUser/ActionTypes";

export const GetAllScheduledInterView =
  (userId:number,token:string) =>
    (
      dispatch: Dispatch<
        scheduledInterviewLoading
        | scheduledInterviewSuccess
        | scheduledInterviewFailure
      >
    ): Promise<void | ActionTypes> => {
      return axios
        .get(`https://questymeprojectrepo-production.up.railway.app/api/interview/${userId}/upcoming-interviews`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then((res) => {
          dispatch({
            type: ActionTypes.GET_EVENTS_DATA_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({ type: ActionTypes.GET_EVENTS_DATA_FAILURE, payload: err });
        });
    };
