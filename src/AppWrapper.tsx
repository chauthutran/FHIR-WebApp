import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, HashRouter, Route } from "react-router-dom";

import './App.css';
import PatientComponent from './components/Patient.component';

function App() {


  return (
    <Provider store={store}>
      <PatientComponent />

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

export default App;
