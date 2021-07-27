import React, { useState } from "react";
import './Navbar.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

function Navbar() {
    const [collapsed, setCollpased] = useState(false);

  return (
    <Layout style={{height: "100%"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="Logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="MainContainer">
        <Header className="Header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollpased(!collapsed),
            }
          )}
        </Header>
        <Content
          className="ContentContainer"
        >
          
        </Content>
      </Layout>
    </Layout>
  );
}

export default Navbar;
