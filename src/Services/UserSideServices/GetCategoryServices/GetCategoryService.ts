import { Action, categoryDataFailure, categoryDataLoading, categoryDataSuccess } from "../../../Redux/CategoryReducer/Action";
import { ActionTypes } from "../../../Redux/CategoryReducer/ActionTypes";
import { Dispatch } from "redux";
import axios from "axios";
export const getAllCategoryDataService =(token:string)=>(dispatch:Dispatch<categoryDataSuccess|categoryDataLoading|categoryDataFailure>):Promise<void | ActionTypes>=>{

    return axios.get("https://questymeprojectrepo-production.up.railway.app/api/category/",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        dispatch({type:ActionTypes.GET_CATEGORY_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:ActionTypes.GET_CATEGORY_FAILURE,payload:err})

    })

}