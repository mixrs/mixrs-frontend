import React from "react";
import "./App.scss";
import { Switch, Route, withRouter } from "react-router-dom";
import Channels from "../Channels/Channels";
import { Layout } from "antd";
import Topbar from "../Topbar/Topbar";
import { Content } from "antd/lib/layout/layout";
import ChannelContent from "../ChannelContent/ChannelContent";

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout style={{ backgroundColor: "white" }}>
        <Topbar />
        <Content
          style={{
            marginTop: 64,
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "#F5F8FA",
          }}
        >
          <Switch>
            <Route path="/channels/:channelId" component={ChannelContent} />
            <Route path="/channels" component={Channels} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default withRouter(App);
