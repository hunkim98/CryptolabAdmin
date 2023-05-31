import {
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// const rootReducer = combineReducers({
//   auth,
//   userInfo,
// });

export interface RootState {}

const rootReducer = (
  state: RootState,
  action: AnyAction
): CombinedState<RootState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({});
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
