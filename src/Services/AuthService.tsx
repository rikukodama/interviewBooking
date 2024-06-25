import axios from "axios";

import { Dispatch } from "redux";
import {Action, isLoginFailure, isLoginSuccess} from "../Redux/AuthReducer/Action"
import {ActionTypes} from "../Redux/AuthReducer/ActionTypes"
import { LoginData } from "../Pages/Login/LoginUser";
import { resetPasswordEmail } from "@/Pages/Login/ForgetPassword";

export const loginService =(payload:LoginData)=>(dispatch:Dispatch<isLoginSuccess|isLoginFailure>):Promise<void | ActionTypes>=>{
    // http://35.178.167.63:8888/auth/login"
 return axios.post("https://questymeprojectrepo-production.up.railway.app/auth/login",payload).then((res)=>{
  dispatch({type:ActionTypes.LOGIN_SUCCESS,payload:res.data})
  return ActionTypes.LOGIN_SUCCESS
 })
 .catch((err)=>{
  dispatch({type:ActionTypes.LOGIN_ERROR,payload:err})
 })

}
export const resetPassword =(payload:string)=>(dispatch:any):Promise<void | ActionTypes>=>{
    // http://35.178.167.63:8888/auth/login"/auth/forgotpassword/{email}
 
 return axios.get(`https://questymeprojectrepo-production.up.railway.app/auth/forgotpassword/${payload}`)

}

export const verifyPassword =(payload:any)=>(dispatch:any):Promise<void | ActionTypes>=>{
 return axios.post(`https://questymeprojectrepo-production.up.railway.app/auth/verify`,payload)

}