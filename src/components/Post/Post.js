import React from "react";
import "./Post.css";
import moment from "moment";
import { Avatar, Image } from "antd";
import { Link, useParams } from "react-router-dom";

function Post({ data }) {
  let { channelId } = useParams();
  return (
    <div className="Post">
      <div className="PostedBy">
        <Avatar
          src={<Image src={`data:image/png;base64, ${data.user.image}`} />}
        />
        <span className="Author">
          {data.user.name} posted{" "}
          {data.createdAt === null ? "" : moment(data.createdAt).fromNow()}
        </span>
      </div>
      <Link
        className="PostTitle"
        to={`/channels/${channelId}/posts/${data.id}`}
      >
        {data.title}
      </Link>
      <p className="PostContent">{data.content}</p>
      <hr className="Divider" />
    </div>
  );
}

export default Post;
