import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import getOptions from "./store/drizzleOptions";
import getStore from "./store/store";
import Home from "./components/Home";
import HeaderBar from "./components/HeaderBar";
import ProductDetail from './components/product/product-page/ProductDetail'
import LoadingContainer from "./components/load/LoadingContainer";
import "./App.css";


const App = ({ library }) => {
  const drizzle = new Drizzle(getOptions(library), getStore(library));

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          // console.log(drizzle, drizzleState);

          return (
            <LoadingContainer
              drizzleState={drizzleState}
              initialized={initialized}
            >

              <Router>
                <HeaderBar drizzle={drizzle} drizzleState={drizzleState} />
                <Route exact path="/">
                  <Home drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route exact path="/product/:productName" render={(props) => {
                    return (
                      <ProductDetail {...props}
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                      />
                    )}
                  }
                />
              </Router>
            </LoadingContainer>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
