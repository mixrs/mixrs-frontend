import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import "./PostList.scss";
import Title from "antd/lib/typography/Title";
import Post from "../Post/Post";
import { Button } from "antd";
import NewPost from "../NewPost/NewPost";

function PostList() {
  let { channelId } = useParams();

  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const showForm = () => {
    setShowNewPostForm(true);
  };

  const closeForm = () => {
    setShowNewPostForm(false);
  };

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
      <div className="PostListHeader">
        <Title level={4}>{`Posts (${posts.length})`}</Title>
        <Button type="primary" onClick={() => showForm()} shape="round">
          New Post
        </Button>
      </div>
      <NewPost
        onClose={closeForm}
        visible={showNewPostForm}
        posts={posts}
        setPosts={setPosts}
      />
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
