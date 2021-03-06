import React from "react";
import "./NewPost.css";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import { createPost } from "../services/Posts";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/Users";

function NewPost({ onClose, visible, posts, setPosts }) {
  const [form] = Form.useForm();
  let { channelId } = useParams();

  const onFinish = () => {
    form.validateFields().then((values) => {
      onClose();
      createPost(values, channelId).then((res) => {
        let data = res.data;
        let userId = data.user.id;
        getUserById(userId).then((res) => {
          setPosts([
            ...posts,
            {
              id: data.id,
              title: data.title,
              content: data.content,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              user: {
                id: res.data.id,
                name: res.data.name,
                image: res.data.image,
              },
            },
          ]);
        });
      });
      form.resetFields();
    });
  };

  return (
    <Drawer
      title="Create a new Post"
      width={720}
      height={400}
      onClose={onClose}
      visible={visible}
      placement="bottom"
      destroyOnClose={true}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={onFinish}>
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter post title" }]}
            >
              <Input placeholder="Please enter post title" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Please enter post content",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter post content"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default NewPost;
