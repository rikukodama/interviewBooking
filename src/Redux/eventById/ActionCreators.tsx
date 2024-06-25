import { Dispatch } from "redux"
import { ActionIDataState ,ActionOneOnOne} from "./Action"
import { ActionTypes } from "./ActionTypes"


export  const GetSingleData = (payload:any)=>{
  return (dispatch :Dispatch<ActionIDataState>)=>{
     dispatch({
      type:ActionTypes.GET_SINGLE_DATA_SUCCESS,
      payload:payload
     })
  }
}


export  const SetOneOnOneData = (payload:any)=>{
  return (dispatch :Dispatch<ActionOneOnOne>)=>{
     dispatch({
      type:ActionTypes.SET_SINGLE_DATA_SUCCESS,
      payload:payload
     })
  }
}