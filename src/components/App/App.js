import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Switch, Route, withRouter } from "react-router-dom";
import Channels from "../Channels/Channels";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
import Dashboard from "../Dashboard/Dashboard";
import PostDetail from "../PostDetail/PostDetail";
import ChannelContent from "../ChannelContent/ChannelContent";

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
              <Route
                path="/channels/:channelId/posts/:postId"
                component={PostDetail}
              />
              <Route path="/channels/:channelId" component={ChannelContent} />
              <Route path="/channels" component={Channels} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(App);
