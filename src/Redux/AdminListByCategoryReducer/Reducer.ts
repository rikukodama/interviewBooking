import { ActionTypes } from "./ActionTypes";
import { Action } from "./Action";

export interface adminListState {
  isLoading: boolean,
  isError: boolean,
  admins:any
}

const initialState: adminListState= {
  isLoading: false,
  isError: false,
  admins:[] ,
};
// console.log("iniadsd",initialState)
export const reducer = (
  state: adminListState = initialState,
  action: Action
):adminListState => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_REQUEST:
       
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_SUCCESS:
        
      return {
        ...state,
        isLoading: false,
        isError: false,
        admins:payload
      };
    case ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};