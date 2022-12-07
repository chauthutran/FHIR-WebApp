import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App';

function AppWrapper() {


  return (
    <Provider store={store}>
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
