import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";
// import { BrowserRouter as Router, HashRouter, Route } from "react-router-dom";

import './App.css';
// import PatientComponent from './components/Patient.component';
// import SearchAppConfigComponent from './components/SearchAppConfig.component';
import App from './App';

function AppWrapper() {


  // const store = configureStore();
  return (
    <Provider store={store}>
      {/* <PatientComponent /> */}
        <App />
    </Provider>
    // <Provider store={store}>
    //       {/* <HashRouter> */}
    //             <div className='app_wrapper'>
    //                 {/* <Switch> */}
    //                     <Route exact path={"/"} component={PatientComponent} />
    //                     {/* <Route exact path={"/patient"} component={PatientComponent} /> */}
    //                 {/* </Switch> */}
    //             </div>
    //         {/* </HashRouter> */}
    // </Provider>
  );
}

export default AppWrapper;
