import React, { useState, useEffect } from "react";
import moment from "moment";
import "./PostDetail.css";
import { Avatar, Image, Comment, Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/Posts";
import CommentList from "../CommentList/CommentList";
const { TextArea } = Input;

function PostDetail() {
  let { channelId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");

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

  const handleChange = (e) => {
    setCurrentComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!currentComment) {
      return;
    }

    setComments([
      ...comments,
      {
        author: post.user.name,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: <p>{currentComment}</p>,
        datetime: moment().fromNow(),
      },
    ]);

    setCurrentComment("");
  };

  const Editor = ({ onChange, onSubmit, value }) => (
    <>
      <Form.Item>
        <TextArea rows={2} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary" shape="round">
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
                <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
            <hr className="Divider" />
          </div>
          <h4>{post.user.name}</h4>
          <div className="PostContent">{post.content}</div>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              Editor({
                onChange: handleChange,
                onSubmit: handleSubmit,
                value: currentComment,
              })
            }
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default PostDetail;
