import React from "react";
import "./Post.css";
import { Avatar, Image } from "antd";

function Post({ data }) {
  return (
    <div className="Post">
      <div className="PostedBy">
        <Avatar
          src={
            <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
        />
        <span className="Author">{data.user.name} posted</span>
      </div>
      <h2 className="PostTitle">{data.title}</h2>
      <p className="PostContent">{data.content}</p>
      <hr className="Divider" />
    </div>
  );
}

export default Post;
