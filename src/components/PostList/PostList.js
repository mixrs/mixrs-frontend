import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "../Post/Post";
import "./PostList.css";
import NewPost from "../NewPost/NewPost";

function PostList() {
  let { channelId } = useParams();

  const [alert, setAlert] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (posts.length && !alert) {
      return;
    }

    getAllPosts(channelId).then((items) => {
      if (mounted) {
        setPosts(items.data);
        setAlert(false);
      }
    });

    return () => (mounted = false);
  }, [posts, alert, channelId]);

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
      >
        New Post
      </Button>
      <NewPost onClose={onClose} visible={showPostForm} setAlert={setAlert} />
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
