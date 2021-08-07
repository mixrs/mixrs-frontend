import React, { useState, useEffect } from "react";
import { Button, Row, Tag } from "antd";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../services/Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Post from "../Post/Post";
import "./PostList.css";
import NewPost from "../NewPost/NewPost";
import Title from "antd/lib/typography/Title";
import { getChannelById } from "../services/Channels";

function grabColor() {
  let tagColors = [
    "red",
    "green",
    "blue",
    "magenta",
    "orange",
    "cyan",
    "geekblue",
  ];
  let random = Math.floor(Math.random() * tagColors.length);
  return tagColors[random];
}

function PostList() {
  let { channelId } = useParams();

  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentChannel, setCurrentChannel] = useState([]);

  useEffect(() => {
    let mounted = true;

    getChannelById(channelId).then((channel) => {
      if (mounted) {
        setCurrentChannel(channel.data);
      }
    });

    return () => (mounted = false);
  }, [channelId]);

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
      <div className="PostListHeader">
        <Title level={2}>{currentChannel.title}</Title>
        <Button
          type="primary"
          shape="round"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={showDrawer}
          style={{ marginBottom: "20px" }}
        >
          New Post
        </Button>
      </div>
      <div className="PostListChannelTags">
        {currentChannel.tags
          ? currentChannel.tags.map((tag) => {
              return (
                <Tag color={`${grabColor()}`} key={tag} className="ChannelTags">
                  {tag}
                </Tag>
              );
            })
          : ""}
      </div>
      <NewPost
        onClose={onClose}
        visible={showPostForm}
        posts={posts}
        setPosts={setPosts}
      />
      <div clasName="PostListContent">
        {posts.length !== 0 ? (
          posts.map((post) => {
            return <Post data={post} key={post.id} />;
          })
        ) : (
          <Title level={2} style={{color: "white", marginTop: "10px"}}>No posts yet...</Title>
        )}
      </div>
    </div>
  );
}

export default PostList;
