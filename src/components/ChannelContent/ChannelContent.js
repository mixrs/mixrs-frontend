import { Col, Divider, Row, Typography, Button, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChannelById } from "../services/Channels";
import "./ChannelContent.scss";
import Paragraph from "antd/lib/typography/Paragraph";
import { CheckOutlined } from "@ant-design/icons";
import PostList from "../PostList/PostList";
import Announcements from "../Announcements/Announcements";

const { Title } = Typography;

function ChannelContent() {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [showChannelPosts, setShowChannelPosts] = useState(true);
  const [showChannelAnnouncements, setShowChannelAnnouncements] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    getChannelById(channelId)
      .then((res) => {
        if (mounted) {
          setChannelDetails(res.data);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [channelId]);

  return (
    <div className="ChannelContent">
      {channelDetails ? (
        <>
          <div className="ChannelBanner">
            <Row justify="space-between" gutter={[24, 12]}>
              <Col xs={24} md={6} lg={4}>
                <Avatar
                  src={`data:image/png;base64, ${channelDetails.image}`}
                  size={{
                    xs: 64,
                    sm: 128,
                    md: 128,
                    lg: 128,
                    xl: 128,
                    xxl: 256,
                  }}
                />
              </Col>
              <Col xs={24} md={14} lg={18}>
                <Row>
                  <Col xs={24}>
                    <Title level={4}>{channelDetails.title}</Title>
                  </Col>
                  <Col xs={24}>
                    <Paragraph>{channelDetails.description}</Paragraph>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={4} lg={2}>
                <Button type="primary" icon={<CheckOutlined />} shape="round">
                  Join
                </Button>
              </Col>
            </Row>
            <Divider style={{ margin: "12px" }} />
            <Menu defaultSelectedKeys={"1"} mode="horizontal">
              <Menu.Item
                key="1"
                onClick={() => {
                  setShowChannelAnnouncements(false);
                  setShowChannelPosts(true);
                }}
              >
                Posts
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  setShowChannelPosts(false);
                  setShowChannelAnnouncements(true);
                }}
              >
                Announcements
              </Menu.Item>
            </Menu>
          </div>
          {showChannelPosts ? <PostList /> : null}
          {showChannelAnnouncements ? <Announcements /> : null}
        </>
      ) : null}
    </div>
  );
}

export default ChannelContent;
