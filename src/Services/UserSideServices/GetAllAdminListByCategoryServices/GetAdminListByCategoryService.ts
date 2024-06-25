import { ActionTypes } from "../../../Redux/AdminListByCategoryReducer/ActionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  adminListByCategoryFailure,
  adminListByCategoryLoading,
  adminListByCategorySuccess,
} from "../../../Redux/AdminListByCategoryReducer/Action";

export const getAlladminListByCategoryService =
  (type: string,token:string) =>
  (
    dispatch: Dispatch<adminListByCategorySuccess | adminListByCategoryFailure>
  ): Promise<void | ActionTypes> => {
    return axios
      .get(`https://questymeprojectrepo-production.up.railway.app/slot/get-all-available-admin/${type}`)
      .then((res) => {
        // console.log(res.data,"catList")
        dispatch({
          type: ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        // console.log(err)
        dispatch({
          type: ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_FAILURE,
          payload: err,
        });
      });
  };
