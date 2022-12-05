

import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import StatusReducer from "./reducers/Status.reducer";
import AppConfigurationReducer from "./reducers/AppConfiguration.reducer";
import ResourceTypeReducer from "./reducers/ResourceType.reducer";


// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
const store = configureStore({
	reducer: {
		statusData: StatusReducer,
		appConfigData: AppConfigurationReducer,
		resourceTypeList: ResourceTypeReducer
	},
	middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({serializableCheck: false}),
})

export default store;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch