import React from "react";
import "./Topbar.css";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

function Topbar() {
  const location = useLocation();
  console.log(location.pathname);

  let menuItems = null;

  let selectedKey = 1;

  if (location.pathname.includes("/channels")) {
    if (location.pathname.includes("/posts")) {
      selectedKey = 2;
    }
  }

  if (location.pathname.includes("/channels")) {
    menuItems = (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[`${selectedKey}`]}
      >
        <Menu.Item key="1">
          <Link to="/channels">All</Link>
        </Menu.Item>
        <Menu.Item key="2">Posts</Menu.Item>
      </Menu>
    );
  } else {
    menuItems = (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">General</Menu.Item>
      </Menu>
    );
  }

  return <Header className="Topbar">{menuItems}</Header>;
}

export default Topbar;
