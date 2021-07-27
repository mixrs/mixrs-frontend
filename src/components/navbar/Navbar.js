import React, { useState } from "react";
import "./Navbar.css";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Top from "../top/Top";
const { Sider, Content } = Layout;

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="Logo">
          <FontAwesomeIcon icon={['fab', 'mendeley']} />
          <p>MiXrS</p>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faLayerGroup} />}>
            Channels
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faFileAlt} />}>
            Posts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="MainContainer">
        <Top collapsed={collapsed} toggleCollapse={setCollapsed} />
        <Content className="ContentContainer"></Content>
      </Layout>
    </Layout>
  );
}

export default Navbar;
