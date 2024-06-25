import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";
import { interview } from "../../Pages/UserDashboard/UserDashboard";
export interface SchecduledInterviewState {
    isLoading:boolean,
    isError:boolean,
    interviews:any
}
const initialState:SchecduledInterviewState ={
    isLoading:false,
    isError:false,
    interviews:[]
}

export const reducer =(state:SchecduledInterviewState=initialState,action:Action):SchecduledInterviewState=>{
    const {payload} = action;
    switch(action.type){
        case ActionTypes.GET_EVENTS_DATA_SUCCESS:
            return {
                ...state,
                interviews:payload,
                isLoading:false,
                isError:false
            }
        case ActionTypes.GET_EVENTS_DATA_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    isError:false,
                } 
        case ActionTypes.GET_EVENTS_DATA_FAILURE:
                    return {
                        ...state,
                        isLoading:false,
                        isError:true,
                    }               
            default:
                return state
    }
};
