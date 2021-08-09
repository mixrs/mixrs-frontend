import { Row, Col, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllChannels } from "../services/Channels";
import "./Channels.scss";

// function grabColor() {
//   let tagColors = [
//     "red",
//     "green",
//     "blue",
//     "magenta",
//     "orange",
//     "cyan",
//     "geekblue",
//   ];
//   let random = Math.floor(Math.random() * tagColors.length);
//   return tagColors[random];
// }

function Channels() {
  const history = useHistory();
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
      <Title level={4}>Featured Channels</Title>
      <Row justify="flex-start" align="middle" gutter={[24, 24]}>
        {channelList.map((channel) => {
          return (
            <Col xs={24} md={12} lg={8} xl={6} key={channel.id}>
              <div
                className="ChannelsCard"
                onClick={() => {
                  history.push(`/channels/${channel.id}`);
                }}
              >
                <Avatar
                  size={64}
                  src={`data:image/png;base64, ${channel.image}`}
                />
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
