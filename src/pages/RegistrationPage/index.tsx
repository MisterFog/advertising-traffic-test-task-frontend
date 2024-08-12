import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerEffectCallbacks } from '../../services/paths/effectCallbacksInstances';

const RegistrationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('birthDate', values.birthDate.format('YYYY-MM-DD'));
      formData.append('gender', values.gender);

      if (values.profilePicture) {
        formData.append('profilePicture', values.profilePicture.file);
      }

      const response = await registerEffectCallbacks.create(formData);

      // Сохраняем токен в локальном хранилище после успешной регистрации
      localStorage.setItem('authToken', response.token);
      message.success('Registration successful!');

      // Перенаправляем пользователя на страницу аккаунта
      navigate('/account');
    } catch (error) {
      message.error(`Registration failed! ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="birthDate"
        label="Birth Date"
        rules={[{ required: true, message: 'Please select your birth date!' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="profilePicture" label="Profile Picture">
        <Upload maxCount={1} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationPage;
