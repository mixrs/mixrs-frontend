import React from "react";
import "./Post.scss";
import moment from "moment";
import { Avatar, Image } from "antd";
import Title from "antd/lib/typography/Title";
import PostComments from "../PostComments/PostComments";
import Paragraph from "antd/lib/typography/Paragraph";

function Post({ data }) {
  return (
    <div className="Post">
      <div className="PostedBy">
        <Avatar
          src={<Image src={`data:image/png;base64, ${data.user.image}`} />}
        />
        <span className="Author">
          {data.user.name} posted {moment(data.createdAt).fromNow()}
        </span>
      </div>
      <Title level={4}>{data.title}</Title>
      <Paragraph className="PostContent">{data.content}</Paragraph>
      <PostComments postId={data.id} />
    </div>
  );
}

export default Post;
