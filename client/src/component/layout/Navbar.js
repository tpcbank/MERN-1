import React, { useState } from "react";
// react router dom
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// antd
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  HomeOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
// redex
import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to={"/"} />
        Home
      </Menu.Item>
      <Menu.Item key="person" icon={<AppstoreOutlined />}>
        Person
      </Menu.Item>

      {!user && (
        <Menu.Item
          className="float-right"
          key="register"
          icon={<UserAddOutlined />}
        >
          <Link to={"/register"} />
          Register
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item className="float-right" key="login" icon={<LoginOutlined />}>
          <Link to={"/login"} />
          Login
        </Menu.Item>
      )}
      {user && (
        <SubMenu
          className="float-right"
          key="Submenu"
          icon={<UserOutlined />}
          title={user.name}
        >
          <Menu.Item key="login" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Navbar;
