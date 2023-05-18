import { useState, Fragment, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/Landing";
import Register from "./components/workers/Register";
import Login from './components/Login'
import Appointments from './components/Appointments'
import Profile from './components/Profile'
import Message from './components/messages/message'
import Messages from './components/messages/messages'
import Chat from './components/Chat'
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import { loadUser } from "./Actions/register";
import store from "./store";

if(localStorage.token) {
  setHeader(localStorage.getItem('token'))
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Container varient='dark'>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/chat" component={Chat} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
