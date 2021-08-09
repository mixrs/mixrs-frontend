import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import "./PostList.css";
import Title from "antd/lib/typography/Title";
import Post from "../Post/Post";

// function grabColor() {
//   let tagColors = [
//     "red",
//     "green",
//     "blue",
//     "magenta",
//     "orange",
//     "cyan",
//     "geekblue",
//   ];
//   let random = Math.floor(Math.random() * tagColors.length);
//   return tagColors[random];
// }

function PostList() {
  let { channelId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    getAllPosts(channelId).then((items) => {
      if (mounted) {
        setPosts(items.data);
      }
    });

    return () => (mounted = false);
  }, [channelId]);

  return (
    <div className="PostList">
      <Title level={4}>{`Posts (${posts.length})`}</Title>
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
