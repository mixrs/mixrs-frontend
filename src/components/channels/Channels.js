import { Button, Card, Avatar, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import "./Channels.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewChannel from "../newchannel/NewChannel";

const { Meta } = Card;

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
  const [showChannelForm, setShowChannelForm] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAllChannels().then((items) => {
      if (mounted) {
        let data = items.data;
        let allChannels = [];
        if (!data) {
          return null;
        }
        data.map((i) => {
          let c = {
            details: {
              id: i.id,
              title: i.title,
              description: i.description,
            },
            tags: ["gaming", "humor", "memes"],
          };

          allChannels.push(c);
          return null;
        });
        setChannelList(allChannels);
      }
    });

    return () => (mounted = false);
  }, []);

  const showDrawer = () => {
    setShowChannelForm(true);
  };

  const onClose = () => {
    setShowChannelForm(false);
  };

  return (
    <div className="Channels">
      <div className="ChannelsTop">
        <h2>All Channels</h2>
        <Button
          type="primary"
          shape="round"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={showDrawer}
        >
          {" "}
          New Channel
        </Button>
        <NewChannel onClose={onClose} visible={showChannelForm} />
      </div>
      <hr className="Divider" />
      <Row gutter={[16, 24]} style={{ padding: "20px" }} justify="center">
        {channelList.map((channel) => {
          return (
            <Col className="gutter-row" key={channel.details.id}>
              <Card
                className="ChannelCard"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    className="ChannelCardImage"
                  />
                }
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={channel.details.title}
                  description={channel.details.description}
                  className="ChannelCardMeta"
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Channels;
