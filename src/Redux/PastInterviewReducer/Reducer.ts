import { Action } from "./Action";
import { ActionTypes } from "./ActionTypes";

export interface pastInterviewState {
    isLoading:boolean,
    isError:boolean,
    interviews:any
}
const initialState:pastInterviewState ={
    isLoading:false,
    isError:false,
    interviews:[]
}

export const reducer =(state:pastInterviewState=initialState,action:Action):pastInterviewState=>{
    const {payload} = action;
    switch(action.type){
        case ActionTypes.GET_ALL_PAST_EVENTS_DATA_SUCCESS:
            return {
                ...state,
                interviews:payload,
                isLoading:false,
                isError:false
            }
        case ActionTypes.GET_ALL_PAST_EVENTS_DATA_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    isError:false,
                } 
        case ActionTypes.GET_ALL_PAST_EVENTS_DATA_FAILURE:
                    return {
                        ...state,
                        isLoading:false,
                        isError:true,
                    }               
            default:
                return state
    }
};
