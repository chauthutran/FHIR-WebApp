import { combineReducers } from "redux";
import StatusReducer from "./status/Status.reducer";
import AppConfigurationReducer from "./configuration/AppConfiguration.reducer";
import ResourceTypeReducer from "./resourceTypes/ResourceType.reducer";

const rootReducer = combineReducers({
  statusData: StatusReducer,
  appConfigData: AppConfigurationReducer,
  resourceTypeList: ResourceTypeReducer
});

export default rootReducer;