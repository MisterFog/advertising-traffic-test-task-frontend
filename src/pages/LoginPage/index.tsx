import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginEffectCallbacks } from '../../services/paths/effectCallbacksInstances';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await loginEffectCallbacks.create({
        email: values.email,
        password: values.password,
      });

      // Сохраняем токен в локальном хранилище
      localStorage.setItem('authToken', response.token);
      message.success('Login successful!');

      // Перенаправляем пользователя на страницу /account
      navigate('/account');
    } catch (error) {
      message.error(`Login failed! ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
