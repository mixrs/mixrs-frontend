import React, { useState } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Switch, Route, withRouter } from "react-router-dom";
import Top from "../top/Top";
import Channels from "../channels/Channels";
import Sidebar from "../sidebar/Sidebar";
import { Layout } from "antd";
import Dashboard from "../dashboard/Dashboard";
import PostList from "../PostList/PostList";

const { Content } = Layout;

library.add(fab);

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <Layout style={{ height: "100%" }}>
        <Sidebar collapsed={collapsed} />
        <Layout className="MainContainer">
          <Top collapsed={collapsed} toggleCollapse={setCollapsed} />
          <Content className="ContentContainer">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/channels/:channelId/posts" component={PostList} />
              <Route path="/channels" component={Channels} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(App);
