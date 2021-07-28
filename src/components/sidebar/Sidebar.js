import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faFileAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

function Sidebar({ collapsed }) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="Logo">
        <FontAwesomeIcon icon={["fab", "mendeley"]} />
        <p>MiXrS</p>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="0" icon={<FontAwesomeIcon icon={faHome} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faLayerGroup} />}>
          <Link to="/channels">Channels</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faFileAlt} />}>
          Posts
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
