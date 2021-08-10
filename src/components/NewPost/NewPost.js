import React from "react";
import "./NewPost.scss";
import { Drawer, Form, Button, Col, Row, Input, message } from "antd";
import { createPost } from "../services/Posts";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/Users";

function NewPost({ onClose, visible, posts, setPosts }) {
  const [form] = Form.useForm();
  let { channelId } = useParams();

  const onFinish = () => {
    form.validateFields().then((values) => {
      onClose();
      createPost(values, channelId)
        .then((res) => {
          let data = res.data;
          let userId = data.user.id;
          getUserById(userId)
            .then((res) => {
              setPosts([
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
                ...posts,
              ]);
            })
            .catch((err) => console.error(err));
        })
        .then(() => message.success("Added New Post", 3))
        .catch((err) => {
          console.error(err);
          message.error("Error Creating New Post", 3);
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
              <Input placeholder="Please enter post title" allowClear />
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
                allowClear
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default NewPost;
