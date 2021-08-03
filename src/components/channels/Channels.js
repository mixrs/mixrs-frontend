import { Image, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import { Link } from "react-router-dom";
import "./Channels.css";

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

  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      width: 100,
      render: () => (
        <Image
          width={100}
          height={100}
          src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${Date.now()}`}
          placeholder={
            <Image
              preview={false}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
              width={100}
            />
          }
        />
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (data) => (
        <div className="ChannelDetails">
          <Link to={`/channels/${data.id}`} className="Title">
            {data.title}
          </Link>
          <p>{data.description}</p>
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: 300,
      render: (tags) => (
        <div className="TagDetails">
          {tags.map((tag) => {
            return (
              <Tag color={grabColor()} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 300,
      render: () => (
        <div>
          <a href="/">Edit</a>|<a href="/">Delete</a>
        </div>
      ),
    },
  ];

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

  return (
    <div className="Channels">
      <h2>All Channels</h2>
      <hr className="Divider" />
      <div>
        <Table
          bordered={false}
          columns={columns}
          dataSource={channelList}
          pagination={
            channelList.length > 10
              ? { position: ["topLeft"] }
              : { position: [] }
          }
        />
      </div>
    </div>
  );
}

export default Channels;
