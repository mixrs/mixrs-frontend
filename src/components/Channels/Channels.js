import { Button, Card, Row, Col, Tag, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import "./Channels.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewChannel from "../NewChannel/NewChannel";
import { useHistory } from "react-router-dom";
import Title from "antd/lib/typography/Title";

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
  const history = useHistory();

  useEffect(() => {
    let mounted = true;

    getAllChannels().then((items) => {
      if (mounted) {
        setChannelList(items.data);
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
          New Channel
        </Button>
        <NewChannel
          onClose={onClose}
          visible={showChannelForm}
          channels={channelList}
          setChannelList={setChannelList}
        />
      </div>
      <hr className="Divider" />
      <Row gutter={[16, 24]} style={{ padding: "20px" }} justify="center">
        {channelList.length !== 0 ? (
          channelList.map((channel) => {
            let moreThanTwoTags = channel.tags.length > 2;
            return (
              <Col className="gutter-row" key={channel.id}>
                <Card
                  className="ChannelCard"
                  cover={
                    <img
                      alt="example"
                      src={`data:image/png;base64, ${channel.image}`}
                      className="ChannelCardImage"
                    />
                  }
                  onClick={() => {
                    history.push(`/channels/${channel.id}`);
                  }}
                >
                  <Meta
                    title={channel.title}
                    description={channel.description}
                    className="ChannelCardMeta"
                  />
                  {channel.tags.length !== 1 && channel.tags[0] !== "" ? (
                    <Tooltip title={channel.tags.join(", ")}>
                      <Row gutter={[4, 2]} justify="left" align="middle">
                        {channel.tags.slice(0, 2).map((tag) => {
                          return (
                            <Col className="gutter-row" key={tag}>
                              <Tag
                                color={`${grabColor()}`}
                                className="ChannelTags"
                              >
                                {tag}
                              </Tag>
                            </Col>
                          );
                        })}
                        {moreThanTwoTags ? (
                          <div style={{ color: "red" }}>+more...</div>
                        ) : (
                          ""
                        )}
                      </Row>
                    </Tooltip>
                  ) : null}
                </Card>
              </Col>
            );
          })
        ) : (
          <Title level={2}>No channels yet...</Title>
        )}
      </Row>
    </div>
  );
}

export default Channels;
