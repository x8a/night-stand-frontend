import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import NewBook from "./components/NewBook";
import ProtectedRoute from "./auth/protected-route";
import BookDetail from "./components/BookDetail";
import Nav from "./components/Navbar";
import Reading from "./components/Reading";
import Pending from "./components/Pending";
import Read from "./components/Read";
import EditProfile from "./components/EditProfile";
import NavbarTop from "./components/NavbarTop";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
    };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
    this.setState(
      {
        loggedInUser: userObj,
      },
      () => {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(this.state.loggedInUser)
        );
      }
    );
  };

  render() {
    return (
      <div>
        <Nav user={this.state.loggedInUser} />
        <NavbarTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/logout"
            render={(props) => <Logout {...props} callback={this.getTheUser} />}
          />
          <ProtectedRoute
            exact path="/profile"
            user={this.state.loggedInUser}
            component={Profile}
          />
          <ProtectedRoute
            exact path="/edit/profile"
            user={this.state.loggedInUser}
            component={EditProfile}
          />
          <ProtectedRoute
            exact path="/reading"
            user={this.state.loggedInUser}
            component={Reading}
          />
          <ProtectedRoute
            exact path="/pending"
            user={this.state.loggedInUser}
            component={Pending}
          />
          <ProtectedRoute
            exact path="/read"
            user={this.state.loggedInUser}
            component={Read}
          />
          <ProtectedRoute
            exact path="/create/pending"
            user={this.state.loggedInUser}
            component={NewBook}
          />
          <Route
          exact path="/book/:id"
          render={(props) => <BookDetail {...props} user={this.state.loggedInUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
