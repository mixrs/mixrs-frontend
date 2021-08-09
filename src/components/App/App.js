import React from "react";
import "./App.scss";
import { Switch, Route, withRouter } from "react-router-dom";
import Channels from "../Channels/Channels";
import { Layout } from "antd";
import Topbar from "../Topbar/Topbar";
import { Content } from "antd/lib/layout/layout";

const { Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Topbar />
        <Content
          style={{
            padding: "0 50px",
            marginTop: 64,
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <Switch>
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
