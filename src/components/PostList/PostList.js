import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "../Post/Post";
import "./PostList.css";
import NewPost from "../NewPost/NewPost";
import Title from "antd/lib/typography/Title";

function PostList() {
  let { channelId } = useParams();

  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    let mounted = true;

    getAllPosts(channelId).then((items) => {
      if (mounted) {
        setPosts(items.data);
      }
    });

    return () => (mounted = false);
  }, [channelId]);

  const showDrawer = () => {
    setShowPostForm(true);
  };

  const onClose = () => {
    setShowPostForm(false);
  };

  return (
    <div className="PostList">
      <Button
        type="primary"
        shape="round"
        icon={<FontAwesomeIcon icon={faPlus} />}
        onClick={showDrawer}
        style={{ marginBottom: "20px" }}
      >
        New Post
      </Button>
      <NewPost
        onClose={onClose}
        visible={showPostForm}
        posts={posts}
        setPosts={setPosts}
      />
      {posts.length !== 0 ? (
        posts.map((post) => {
          return <Post data={post} key={post.id} />;
        })
      ) : (
        <Title level={2}>No posts yet...</Title>
      )}
    </div>
  );
}

export default PostList;
