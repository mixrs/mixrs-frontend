import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider trigger={null} collapsed={true}>
      <div className="Logo">
        <FontAwesomeIcon icon={["fab", "mendeley"]} />
        <p>MiXrS</p>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
        <Menu.Item key="0" icon={<FontAwesomeIcon icon={faHome} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faUsers} />}>
          <Link to="/channels">Channels</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
