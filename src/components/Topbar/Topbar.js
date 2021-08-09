import React from "react";
import "./Topbar.scss";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

function Topbar() {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key={1}>
          <Link to="/channels">Channels</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Topbar;
