import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import Post from "../Post/Post";

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
    <div>
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
