import React from "react";
import "./Post.scss";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Avatar, Image, Popconfirm } from "antd";
import Title from "antd/lib/typography/Title";
import PostComments from "../PostComments/PostComments";
import Paragraph from "antd/lib/typography/Paragraph";
import { DeleteFilled } from "@ant-design/icons";

function Post({ data, deletePost, setShowDeleteConfirm }) {
  let { channelId } = useParams();

  return (
    <div className="Post">
      <div className="PostHeader">
        <div className="PostedBy">
          <Avatar
            src={<Image src={`data:image/png;base64, ${data.user.image}`} />}
          />
          <span className="Author">
            {data.user.name} posted {moment(data.createdAt).fromNow()}
          </span>
        </div>
        <Popconfirm title="Are you sure?" onConfirm={() => deletePost(channelId, data.id)}>
          <DeleteFilled
            style={{ color: "red" }}
            onClick={() => setShowDeleteConfirm(true)}
          />
        </Popconfirm>
      </div>

      <Title level={4}>{data.title}</Title>
      <Paragraph className="PostContent">{data.content}</Paragraph>
      <PostComments postId={data.id} />
    </div>
  );
}

export default Post;
