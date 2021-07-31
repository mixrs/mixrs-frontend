import React from "react";
import "./Post.css";
import { Avatar, Image } from "antd";
import { Link } from "react-router-dom";

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
      <Link
        className="PostTitle"
        to={`/channels/${data.channel.id}/posts/${data.id}`}
      >
        {data.title}
      </Link>
      <p className="PostContent">{data.content}</p>
      <hr className="Divider" />
    </div>
  );
}

export default Post;
