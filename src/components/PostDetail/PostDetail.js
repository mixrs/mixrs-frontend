import React, { useState, useEffect } from "react";
import moment from "moment";
import "./PostDetail.css";
import { Avatar, Image, Comment, Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/Posts";
import { createComment, getComments } from "../services/Comments";
import CommentList from "../CommentList/CommentList";
import { getCurrentUser } from "../services/Users";
const { TextArea } = Input;

function PostDetail() {
  let { channelId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = () => {
    getCurrentUser().then((item) => {
      let data = item.data;
      if (!data) {
        return null;
      }

      setCurrentUser(data);
    });
  };

  const fetchComments = (channelId, postId) => {
    getComments(channelId, postId).then((item) => {
      let data = item.data;
      let allComments = [];
      if (!data) {
        return null;
      }
      data.map((i) => {
        let newComment = {
          author: i.user.name,
          avatar: i.user.image
            ? `data:image/png;base64, ${i.user.image}`
            : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: <p>{i.comment}</p>,
          datetime: moment(i.createdAt).fromNow(),
        };

        allComments.push(newComment);
        return null;
      });
      setComments(allComments);
    });
  };

  const fetchPostDetails = (channelId, postId) => {
    getPostById(channelId, postId).then((item) => {
      setPost(item.data);
    });
  };

  const saveComment = () => {
    createComment(channelId, postId, {
      userId: currentUser.id,
      comment: currentComment,
    })
      .then((res) => {
        console.log(res);
        setComments([
          {
            author: currentUser.name,
            avatar: currentUser.image
              ? `data:image/png;base64, ${currentUser.image}`
              : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{currentComment}</p>,
            datetime: moment().fromNow(),
          },
          ...comments,
        ]);
      })
      .then(() => setCurrentComment(""));
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchCurrentUser();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchPostDetails(channelId, postId);
    }

    return () => {
      mounted = false;
    };
  }, [channelId, postId]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchComments(channelId, postId);
    }

    return () => {
      mounted = false;
    };
  }, [channelId, postId]);

  const handleChange = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!currentComment) {
      return;
    }

    saveComment();
  };

  const Editor = ({ onChange, onSubmit, value }) => (
    <>
      <Form.Item>
        <TextArea rows={2} onChange={onChange} value={value} className="CommentTextArea" />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          onClick={onSubmit}
          type="primary"
          shape="round"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  return (
    <div>
      {post ? (
        <div className="PostDetail">
          <h1>{post.title}</h1>
          <h4>Posted By</h4>
          <div className="Author">
            <Avatar
              className="Avatar"
              src={
                <Image
                  src={`data:image/png;base64, ${post.user.image}`}
                  alt={post.user.name}
                />
              }
            />
            <hr className="Divider" />
          </div>
          <h4>{post.user.name}</h4>
          <div className="PostContent">{post.content}</div>
          {comments.length > 0 && <CommentList comments={comments} />}
          {currentUser && (
            <Comment
              avatar={
                <Avatar
                  src={`data:image/png;base64, ${currentUser.image}`}
                  alt={currentUser.name}
                />
              }
              content={Editor({
                onChange: handleChange,
                onSubmit: handleSubmit,
                value: currentComment,
              })}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PostDetail;
