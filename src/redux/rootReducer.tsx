import { combineReducers } from "redux";
import StatusReducer from "./reducers/Status.reducer";
import AppConfigurationReducer from "./reducers/AppConfiguration.reducer";
import ResourceTypeReducer from "./reducers/ResourceType.reducer";

const rootReducer = combineReducers({
  statusData: StatusReducer,
  appConfigData: AppConfigurationReducer,
  resourceTypeList: ResourceTypeReducer
});

export default rootReducer;