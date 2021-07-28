import { Image, Table } from "antd";
import React, { useState, useEffect } from "react";
import { getAllChannels } from "../services/Channels";
import "./Channels.css";

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
          <p>{data.title}</p>
          <p>{data.description}</p>
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
        data.map((i) => {
          let c = {
            id: i.id,
            details: {
              title: i.title,
              description: i.description,
            },
          };

          allChannels.push(c);
        });
        setChannelList(allChannels);
      }
    });

    return () => (mounted = false);
  }, []);

  return (
    <div className="Channel">
      <h2>All Channels</h2>
      <div className="ChannelContent">
        <Table
          columns={columns}
          dataSource={channelList}
          pagination={{ position: ["topRight"] }}
        />
      </div>
    </div>
  );
}

export default Channels;