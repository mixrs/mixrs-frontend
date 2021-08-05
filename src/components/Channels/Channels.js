import { Button, Card, Avatar, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import "./Channels.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewChannel from "../NewChannel/NewChannel";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../services/Users";

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
  const [alert, setAlert] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const fetchCurrentUser = () => {
    getCurrentUser().then((item) => {
      let data = item.data;
      if (!data) {
        return null;
      }

      setCurrentUser(data);
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchCurrentUser();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (channelList.length && !alert) {
      return;
    }
    getAllChannels().then((items) => {
      if (mounted) {
        let data = items ? items.data : null;
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
              image: i.image,
            },
            tags: ["gaming", "humor", "memes"],
          };

          allChannels.push(c);
          return null;
        });
        setChannelList(allChannels);
        setAlert(false);
      }
    });

    return () => (mounted = false);
  }, [alert, channelList]);

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
          setAlert={setAlert}
        />
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
                    src={`data:image/png;base64, ${channel.details.image}`}
                    className="ChannelCardImage"
                  />
                }
                onClick={() => {
                  history.push(`/channels/${channel.details.id}`);
                }}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={
                        currentUser
                          ? `data:image/png;base64, ${currentUser.image}`
                          : ""
                      }
                    />
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
