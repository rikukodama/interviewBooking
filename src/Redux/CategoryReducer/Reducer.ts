import { ActionTypes } from "./ActionTypes";
import { Action } from "./Action";



 
 

   


export interface categoryState {
  isLoading: boolean,
  isError: boolean,
  categories:any
}

const initialState: categoryState = {
  isLoading: false,
  isError: false,
  categories:[] ,
};

export const reducer = (
  state: categoryState = initialState,
  action: Action
):categoryState => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.GET_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ActionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        categories:payload
      };
    case ActionTypes.GET_CATEGORY_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
