import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import AppConfigurationReducer from "./reducers/AppConfiguration.reducer";
import ResourceTypeReducer from "./reducers/ResourceType.reducer";
import StatusReducer from "./reducers/Status.reducer";


const rootReducer = combineReducers({
	statusData: StatusReducer,
	appConfigData: AppConfigurationReducer,
	resourceTypeList: ResourceTypeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
