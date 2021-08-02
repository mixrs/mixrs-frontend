import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Switch, Route, withRouter } from "react-router-dom";
import Channels from "../channels/Channels";
import Sidebar from "../sidebar/Sidebar";
import { Layout } from "antd";
import Dashboard from "../dashboard/Dashboard";
import PostList from "../PostList/PostList";
import PostDetail from "../PostDetail/PostDetail";

const { Content } = Layout;

library.add(fab);

function App() {
  return (
    <div className="App">
      <Layout style={{ height: "100%" }}>
        <Sidebar />
        <Layout className="MainContainer">
          <Content className="ContentContainer">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/channels/:channelId/posts/:postId" component={PostDetail} />
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
