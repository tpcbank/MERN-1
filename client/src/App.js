import React, { useEffect } from "react";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

// notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./component/layout/Navbar";

// Router
import { Switch, Route } from "react-router-dom";
import UserRoute from "./component/routes/UserRoute";
import AdminRoute from "./component/routes/AdminRoute";

// page
import Register from "./component/page/auth/Register";
import Login from "./component/page/auth/Login";
import Home from "./component/page/Home";
// padge user
import UserDashboard from "./component/page/user/UserDashboard";
// page amdin
import AdminDashboard from "./component/page/admin/AdminDashboard";
import AdminCreatePerson from "./component/page/admin/AdminCreatePerson";
import AdminUpdatePerson from "./component/page/admin/AdminUpdatePerson";
// redux
import { useDispatch } from "react-redux";

// function axios
import { currentUser } from "./component/functions/auth.function";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const idTokenResult = localStorage.token;
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              token: idTokenResult,
              name: res.data.name,
              role: res.data.role,
              id: res.data.id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* admin */}
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/admin/create-person" component={AdminCreatePerson} />
        <AdminRoute
          path="/admin/update-person/:id"
          component={AdminUpdatePerson}
        />

        {/* user */}
        <UserRoute path="/user/dashboard" component={UserDashboard} />
      </Switch>
    </div>
  );
}

export default App;
