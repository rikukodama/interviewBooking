import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducer as SingleEventReducer } from "./eventById/Reducer";
import { reducer as AuthReducer } from "./AuthReducer/Reducer";
import { reducer as ScheduledInterviewReducer } from "./ScheduledInterviewUser/Reducer";
import { reducer as CreateSingleInterviewReducer } from "./ScheduleInterviewAdmin/Reducer";
import { reducer as ScheduleBulkInterviewReducer } from "./ScheduleBulkInterviewAdmin/Reducer";
import {reducer as CategoryReducer} from "./CategoryReducer/Reducer"
import {reducer as AdminListByCategoryReducer} from "./AdminListByCategoryReducer/Reducer"
import {reducer as PastInterViewReducer} from "./PastInterviewReducer/Reducer"
import {reducer as CancelInterviewReducer} from "./CancelInterviewReducer/Reducer"
import {reducer as SingleInterviewReducer} from "./InterviewByIdReducer/Reducer"
import {reducer as UpdateSingleInterviewReducer} from "./UpdateSingleInterviewReducer/Reducer"
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootreducer = combineReducers({
  SingleEventReducer,
  AuthReducer,
  ScheduledInterviewReducer,
  CreateSingleInterviewReducer,
  ScheduleBulkInterviewReducer,
  CategoryReducer,
  AdminListByCategoryReducer,
  PastInterViewReducer,
  SingleInterviewReducer,
  CancelInterviewReducer,
  UpdateSingleInterviewReducer
});
export const store = legacy_createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
