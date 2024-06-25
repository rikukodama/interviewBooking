import {Action} from "./Action";
import { ActionTypes } from "./ActionTypes";

const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
export interface IsAuthstate {
    isAuth: boolean;
    token:string,
    user:any,
    isLoading:boolean,
    isError:boolean,
    adminId:number | string
  }

  const initialState ={
    isAuth:userDetails.token ? true : false,
    token:userDetails.token || "",
    user:userDetails.user || {},
    isLoading:false,
    isError:false,
    adminId:userDetails?.user?.id || ""
  };

  export const reducer =(state:IsAuthstate=initialState,action:Action):IsAuthstate=>{
    const {payload} =action;
    switch(action.type){
        case ActionTypes.LOGIN_SUCCESS:
          localStorage.setItem("userDetails",JSON.stringify(payload))
            return{
                ...state,
                isAuth:true,
                user:payload,
               isLoading:false,
               isError:false
            }

          case ActionTypes.LOGIN_REQUEST:
            return{
              ...state,
              isLoading:true,
              isError:false
            }  

          case ActionTypes.LOGIN_ERROR:
            return{
              ...state,
              isLoading:false,
              isError:true
            }  
        default:
            return state
    }
  }