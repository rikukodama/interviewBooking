import {ActionTypes} from "./ActionTypes"

interface IDataState {
    type:ActionTypes.GET_SINGLE_DATA_SUCCESS,
    payload:any 
}

interface ICreateOneOnOneState {
    type:ActionTypes.SET_SINGLE_DATA_SUCCESS,
    payload:any 
}

export type ActionOneOnOne = ICreateOneOnOneState 
export type ActionIDataState = IDataState 