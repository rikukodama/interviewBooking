import {ActionOneOnOne} from "./Action";
import { ActionTypes } from "./ActionTypes";


const initialState = {

 setData:{}
};

export const reducer = (
  state= initialState,
  action: ActionOneOnOne
): any => {
  const { payload } = action;
  switch (action.type) {
    case ActionTypes.SET_SINGLE_DATA_SUCCESS:
      return { ...state, setData:payload };
      
      
    default:
      return state;
  }
};