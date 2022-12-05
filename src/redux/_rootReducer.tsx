import { combineReducers } from "redux";
import AppConfigurationReducer from "./reducers/AppConfiguration.reducer";
import ResourceTypeReducer from "./reducers/ResourceType.reducer";
import StatusReducer from "./reducers/Status.reducer";

const rootReducer = combineReducers({
  statusData: StatusReducer,
  appConfigData: AppConfigurationReducer,
  resourceTypeList: ResourceTypeReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;