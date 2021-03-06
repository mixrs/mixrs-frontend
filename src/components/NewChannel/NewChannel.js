import React, { useState } from "react";
import "./NewChannel.css";
import { Drawer, Form, Button, Col, Row, Input, Upload } from "antd";
import { createNewChannel } from "../services/Channels";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import NewChannelTags from "../NewChannelTags/NewChannelTags";

function NewChannel({ onClose, visible, channels, setChannelList }) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      console.log(tags);
      let formData = new FormData();
      for (const name in values) {
        if (name === "tags") {
          formData.append(name, tags.join(","));
          continue;
        }
        formData.append(name, values[name]);
      }
      onClose();
      createNewChannel(formData).then((res) => {
        let data = res.data;
        setChannelList([
          ...channels,
          {
            id: data.id,
            title: data.title,
            description: data.description,
            image: data.image,
            tags: data.tags,
          },
        ]);
      });
      form.resetFields();
      setImageUrl("");
      setTags([]);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleImageChange = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <Drawer
      title="Create a new channel"
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
        <Row justify="center" align="top" gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Image"
              name="avatar"
              getValueFromEvent={({ file }) => file.originFileObj}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
                customRequest={dummyRequest}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter channel name" }]}
            >
              <Input placeholder="Please enter channel name" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Tags" name="tags">
              <NewChannelTags tags={tags} setTags={setTags} />
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
