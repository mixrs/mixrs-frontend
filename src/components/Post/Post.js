import React from "react";
import "./Post.css";

function Post({ data }) {
  return (
    <div className="Post">
      <p className="PostedBy">{data.user.name} posted</p>
      <h2>{data.title}</h2>
      <p style={{fontWeight: 600}}>{data.content}</p>
      <hr className="Divider" />
    </div>
  );
}

export default Post;
