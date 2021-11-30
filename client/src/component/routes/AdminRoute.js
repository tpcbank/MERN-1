import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedireact from "./LoadingToRedireact";
import { currentAdmin } from "../functions/auth.function";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          //
          console.log("CURRENT ADMIN", res);
          setOk(true);
        })
        .catch((err) => {
          //
          console.log("Admin router err", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedireact />;
};

export default AdminRoute;
