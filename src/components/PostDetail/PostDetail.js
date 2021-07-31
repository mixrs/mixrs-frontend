import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/Posts";

function PostDetail() {
  let { channelId, postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let mounted = true;

    getPostById(channelId, postId).then((item) => {
      if (mounted) {
        setPost(item.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, [channelId, postId]);

  return <div>{post !== null ? post.title : ""}</div>;
}

export default PostDetail;
