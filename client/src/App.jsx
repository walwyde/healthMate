import { useState, Fragment, useEffect } from "react";
import Footer from "./components/layouts/Footer";
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/Landing";
import HealthTipsPage from "./components/tipsPage/HealthTipsPage";
import CreateProfile from "./components/profile/CreateProfile";
import EditStaffProfile from "./components/EditStaffProfile";
import EditUserProfile from "./components/profile/EditUserProfile";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layouts/Alerts";
import ResetPassword from "./components/auth/ResetPassword";
import FindUSerEmail from "./components/auth/FindUSerEmail";
import Appointments from "./components/appointment/Appointments";
import Profile from "./components/Profile";
import Message from "./components/messaging/components/active-conversation/active-conversation";
import Messages from "./components/messaging/components/messages";
import Chat from "./components/Chat";
import { setHeader } from "./utils/setHeader";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import Container from "react-bootstrap/esm/Container";
import { loadUser } from "./Actions/register";
import store from "./store";
import Appointment from "./components/appointment/Appointment";
import ProfileView from "./components/ProfileView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAvatar from "./components/profile/EditAvatar";

if (localStorage.token) {
  setHeader(localStorage.getItem("token"));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alerts />
            <Container varient="dark">
          <Switch>
            <PrivateRoute exact path='/avatar/:id' component={EditAvatar} />
              <PrivateRoute
                exact
                path="/appointments/:id"
                component={Appointment}
              />
              <PrivateRoute
                exact
                path="/appointments"
                component={Appointments}
              />
              <Route exact path="/reset-password/:token" component={ResetPassword} />
              <Route exact path="/reset-password" component={FindUSerEmail} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/health-tips" component={HealthTipsPage} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/messages" component={Messages} />
              <PrivateRoute exact path="/chat" component={Chat} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/profile/:id" component={ProfileView} />

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
              <PrivateRoute exact path="/message/:_id" component={Message} />
              <PrivateRoute exact path="/chat" component={Chat} />
          </Switch>
            </Container>
            <Route exact path="/" component={Landing} />
          <Footer />
          <ToastContainer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
