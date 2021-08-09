import { Row, Col, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import "./Channels.scss";

function grabColor() {
  let tagColors = [
    "red",
    "green",
    "blue",
    "magenta",
    "orange",
    "cyan",
    "geekblue",
  ];
  let random = Math.floor(Math.random() * tagColors.length);
  return tagColors[random];
}

function Channels() {
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    let mounted = true;

    getAllChannels().then((items) => {
      if (mounted) {
        setChannelList(items.data);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <div className="Channels">
      <Row justify="space-around" align="middle" gutter={[16, 24]}>
        {channelList.map((channel) => {
          return (
            <Col xs={24} sm={24} md={12} lg={8} xl={4}>
              <div className="ChannelsCard">
                <Avatar size={64} />
                <div>
                  <Title level={5} className="ChannelsCardTitle">
                    {channel.title}
                  </Title>
                  <Tooltip title={channel.description}>
                    <Paragraph ellipsis={{ rows: 1 }}>
                      {channel.description}
                    </Paragraph>
                  </Tooltip>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Channels;
