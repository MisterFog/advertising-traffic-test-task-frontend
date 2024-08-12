import React, { useContext } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { profileEffectCallbacks } from '../../services/paths/effectCallbacksInstances';
import { UserContext } from '../../context/UserContext';

const AccountPage: React.FC = () => {
  const [form] = Form.useForm();
  const userContext = useContext(UserContext);
  const updateUser = userContext?.updateUser;

  const handleUpdate = async (values: any) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === 'profilePicture' && values[key]) {
        const file = values[key].fileList[0]?.originFileObj;

        if (file) {
          formData.append('profilePicture', file);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      const token = localStorage.getItem('authToken');
      const decodedToken: any = jwtDecode(token || '');
      const userId = decodedToken.userId;
      formData.append('userId', userId);

      const updatedUserData = await profileEffectCallbacks.update(formData);

      updateUser?.(updatedUserData.user);

      message.success('Update successful!');
    } catch (error) {
      message.error(`Error updating profile: ${error}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Account</h2>
      <Form form={form} onFinish={handleUpdate} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="profilePicture" label="Profile Picture">
          <Upload name="profilePicture" listType="picture" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountPage;
