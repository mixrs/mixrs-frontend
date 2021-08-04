import React from "react";
import "./NewChannel.css";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import { createNewChannel } from "../services/Channels";

function NewChannel({ onClose, visible }) {
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      console.log(values);
      onClose();
      createNewChannel(values).then((res) => {
        console.log(res);
      });
    });
  };

  return (
    <Drawer
      title="Create a new channel"
      width={720}
      height={400}
      onClose={onClose}
      visible={visible}
      placement="bottom"
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
              rules={[{ required: true, message: "Please enter channel name" }]}
            >
              <Input placeholder="Please enter channel name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter channel description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter channel description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default NewChannel;
