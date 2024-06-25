import { ActionTypes } from "./ActionTypes";
import { IsAuthstate} from "./Reducer";
export interface isLoginSuccess{
    type:ActionTypes.LOGIN_SUCCESS,
    payload:IsAuthstate
}
export interface isLoginLoading{
    type:ActionTypes.LOGIN_REQUEST,
    payload:true
    
}

export interface isLoginFailure{
    type:ActionTypes.LOGIN_ERROR,
    payload:true
    
}

export type Action = isLoginSuccess | isLoginFailure | isLoginLoading;