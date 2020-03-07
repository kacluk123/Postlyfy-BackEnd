import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { postsReducer } from "../redux/reducers/postReducer";
import { userReducer } from "../redux/reducers/userReducer";
import { postFiltersReducer } from "../redux/reducers/postsFilterReducer";

const middlewares = [thunk];

const rootReducer = combineReducers({
  postsReducer,
  postFiltersReducer,
  userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export interface IRootReducer {
  userReducer: ReturnType<typeof userReducer>;
  postsReducer: ReturnType<typeof postsReducer>;
  postFiltersReducer: ReturnType<typeof postFiltersReducer>;
}

export type AppState = IRootReducer;
