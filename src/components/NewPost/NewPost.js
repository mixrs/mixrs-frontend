import React from "react";
import "./NewPost.css";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import { createPost } from "../services/Posts";
import { useParams } from "react-router-dom";

function NewPost({ onClose, visible, setAlert }) {
  const [form] = Form.useForm();
  let { channelId } = useParams();

  const onFinish = () => {
    form.validateFields().then((values) => {
      values.userId = "240e94d1-a203-4456-91c9-09cbe7df2c6e";
      onClose();
      createPost(values, channelId).then((res) => {
        setAlert(true);
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
