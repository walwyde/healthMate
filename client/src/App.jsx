import { useState, Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/Landing";
import Register from './components/Register'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
          <Route exact path='/register' component={Register}/>
          </Switch>
        </section>

      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
