import { useState, Fragment, useEffect } from "react";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/Landing";
import CreateProfile from "./components/workers/CreateProfile";
import EditStaffProfile from "./components/workers/EditStaffProfile";
import EditUserProfile from "./components/profile/EditUserProfile";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alerts";
import Appointments from "./components/Appointments";
import Profile from "./components/Profile";
import Message from "./components/messages/message";
import Messages from "./components/messages/messages";
import Chat from "./components/Chat";
import { setHeader } from "./utils/setHeader";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { loadUser } from "./Actions/register";
// import { ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import store from "./store";

if (localStorage.token) {
  setHeader(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Container varient="dark">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/messages" component={Messages} />
              <PrivateRoute exact path="/chat" component={Chat} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/appointments"
                component={Appointments}
              />
              <PrivateRoute
                exact
                path="/edit-staff-profile/:_id"
                component={EditStaffProfile}
              />
              <PrivateRoute
                exact
                path="/edit-user-profile/:_id"
                component={EditUserProfile}
              />
            </Switch>
            {/* <ToastContainer /> */}
          </Container>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
