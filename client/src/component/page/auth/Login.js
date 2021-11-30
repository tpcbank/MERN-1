import React, { useState } from "react";
import { toast } from "react-toastify";

// function
import { loginHandler } from "../../functions/auth.function";

// redux
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  // data in state
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formData;
  // data loading
  const [loading, setLoading] = useState(false);

  // check role user
  const roleBasedRedirect = (res) => {
    if (res === "admin") {
      history.push("./admin/dashboard");
    } else {
      history.push("./user/dashboard");
    }
  };

  // onchange => set state (name, password)
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit => send data to backend and set data to redux
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    //get data from state
    const newUser = {
      name,
      password,
    };
    // send data to backend via axios function
    loginHandler(newUser)
      .then((res) => {
        // call use redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        toast.success("Login complete");
        roleBasedRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h1>Login</h1> : <h1>Loading..</h1>}
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="form-control "
              type="text"
              name="name"
              autoFocus
              placeholder="Username"
              onChange={(e) => onChange(e)}
            />
            <input
              className="form-control "
              type="password"
              name="password"
              autoFocus
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
