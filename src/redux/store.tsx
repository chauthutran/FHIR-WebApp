import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import AppConfigurationReducer from "./reducers/AppConfiguration.reducer";
import ResourceTypeReducer from "./reducers/ResourceType.reducer";
import StatusReducer from "./reducers/Status.reducer";
import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    statusData: StatusReducer,
    appConfigData: AppConfigurationReducer,
    resourceTypeList: ResourceTypeReducer
  },
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({serializableCheck: false}),
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// const rootReducer = combineReducers({
// 	statusData: StatusReducer,
// 	appConfigData: AppConfigurationReducer,
// 	resourceTypeList: ResourceTypeReducer
// });

// export type AppState = ReturnType<typeof rootReducer>;

// export default function configureStore() {
//   const middlewares = [thunkMiddleware];
//   const middleWareEnhancer = applyMiddleware(...middlewares);

//   const store = createStore(
//     rootReducer,
//     composeWithDevTools(middleWareEnhancer)
//   );

//   return store;
// }
