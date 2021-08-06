import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
  const location = useLocation();
  const history = useHistory();

  let selectedKey = 1;
  if (location.pathname === "/") {
    selectedKey = 1;
  } else if (
    location.pathname === "/channels" ||
    location.pathname.includes("/channels")
  ) {
    selectedKey = 2;
  }

  return (
    <Sider collapsed={true}>
      <div
        className="Logo"
        onClick={() => {
          history.push("/");
        }}
      >
        <FontAwesomeIcon icon={["fab", "mendeley"]} />
        <p>MiXrS</p>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[`${selectedKey}`]}>
        <Menu.Item key="1" icon={<FontAwesomeIcon icon={faHome} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FontAwesomeIcon icon={faUsers} />}>
          <Link to="/channels">Channels</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
