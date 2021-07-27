import React from "react";
import "./Top.css";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header } = Layout;

function Top({ collapsed, toggleCollapse }) {
  return (
    <Header className="Header">
      {collapsed ? (
        <MenuUnfoldOutlined
          className="trigger"
          onClick={() => toggleCollapse(!collapsed)}
        />
      ) : (
        <MenuFoldOutlined
          className="trigger"
          onClick={() => toggleCollapse(!collapsed)}
        />
      )}
    </Header>
  );
}

export default Top;
