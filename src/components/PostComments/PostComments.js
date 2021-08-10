import React, { useState, useEffect } from "react";
import moment from "moment";
import "./PostComments.scss";
import { Avatar, Comment, Form, Input, Button, message } from "antd";
import { useParams } from "react-router-dom";
import { createComment, getComments } from "../services/Comments";
import CommentList from "../CommentList/CommentList";
import { getCurrentUser } from "../services/Users";
const { TextArea } = Input;

function PostComments({ postId }) {
  let { channelId } = useParams();
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

  const saveComment = () => {
    createComment(channelId, postId, {
      userId: currentUser.id,
      comment: currentComment,
    })
      .then((res) => {
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
      .then(() => setCurrentComment(""))
      .then(() => message.success("Added New Comment", 2))
      .catch((err) => {
        console.error(err);
        message.error("Error Adding New Comment", 2);
      });
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
        <TextArea
          rows={1}
          onChange={onChange}
          value={value}
          className="CommentTextArea"
          autoSize={{ minRows: 1, maxRows: 3 }}
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          onClick={onSubmit}
          type="primary"
          shape="round"
          size="small"
        >
          Comment
        </Button>
      </Form.Item>
    </>
  );

  return (
    <div className="PostComments">
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
  );
}

export default PostComments;
