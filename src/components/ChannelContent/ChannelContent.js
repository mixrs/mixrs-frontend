import React from "react";
import "./ChannelContent.css";
import { Tabs } from "antd";
import Announcements from "../announcements/Announcements";
import PostList from "../PostList/PostList";

const { TabPane } = Tabs;

function ChannelContent() {
  return (
    <div className="ChannelContent">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Posts" key="1">
          <PostList />
        </TabPane>
        <TabPane tab="Announcements" key="2">
          <Announcements />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ChannelContent;
